import { Liveblocks } from "@liveblocks/node";
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { auth, clerkClient, currentUser, WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db/drizzle'
import { user } from '@/lib/db/schemas'
import { eq } from 'drizzle-orm'
import { getSingleBoard } from "@/actions/board.actions";

// export const runtime = 'edge'



const app = new Hono().basePath('/api')

// todo : remove just for testing
app.get('/clerk', async (c) => {
  const user = await clerkClient();
  const { userId } = await auth()
  if (!userId) return
  await user.users.updateUserMetadata(userId, {
    publicMetadata: {
      dashboardTour: false,
      boardTour: false
    }
  })

  return NextResponse.json({ message: 'OK', userId })
}
)

app.post('/webhook', async (c) => {

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing WEBHOOK_SECRET')
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await c.req.json()
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;
    const userId = db.insert(user).values({
      clerkId: id,
      name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
      email: email_addresses[0].email_address,
      image: image_url
    })
    return NextResponse.json({ message: 'OK', userId })
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;
    const [userId] = await db.update(user)
      .set({
        name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
        email: email_addresses[0].email_address,
        image: image_url
      }).where(eq(user.clerkId, id)).returning({ id: user.clerkId });

    return NextResponse.json({ message: 'OK', userId })
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    const [userId] = await db.delete(user).where(eq(user.clerkId, id as string)).returning({ id: user.clerkId });
    return NextResponse.json({ message: 'OK', userId: userId })
  }

  return NextResponse.json({ message: 'OK' })

})


const liveblocks = new Liveblocks({
  secret: "sk_prod_R1ErF4F78Kr6HoWlbm7DT4ktBlTRjVwQAfksWGew_MJ2NX_-XtVWE75vspZ0vQTE",
});

app.post('/liveblocks-auth', async (c) => {
  try {
    // Get authorization and current user
    const authorization = await auth();
    const user = await currentUser();

    if (!user || !authorization) {
      console.log('Unauthorized: Missing user or authorization');
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 403 });
    }

    // Extract room from request body
    const { room } = await c.req.json();
    if (!room) {
      console.log('Unauthorized: Missing room in request');
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 403 });
    }

    // Get single board information
    const singleBoard = await getSingleBoard(room);
    if (!singleBoard) {
      console.log('Unauthorized: Board not found');
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 403 });
    }

    // Authorization checks
    if (
      (singleBoard.visibility === 'personal' && singleBoard.createdBy !== user.id) ||
      (singleBoard.visibility === 'team' && singleBoard.orgId !== authorization.orgId)
    ) {
      console.log('Unauthorized: User not authorized for this board');
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 403 });
    }

    console.log('Authorized: User is authorized for this board');

    // Prepare user info for Liveblocks
    const userInfo = {
      id: user.id,
      name: user.firstName || 'Anonymous',
      picture: user.imageUrl ,
    };

    // Prepare Liveblocks session
    const session = liveblocks.prepareSession(user.id, { userInfo });

    // Allow full access for the room
    session.allow(room, session.FULL_ACCESS);
    // Authorize the session
    const { status, body } = await session.authorize();
    return new Response(body, { status });
  } catch (error) {
    console.error('Error in /liveblocks-auth:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
});



const handler = handle(app)
export { handler as GET, handler as POST }
