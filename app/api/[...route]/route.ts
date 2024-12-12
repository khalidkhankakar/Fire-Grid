import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { auth, clerkClient, WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db/drizzle'
import { user } from '@/lib/db/schemas'
import { eq } from 'drizzle-orm'

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

const handler = handle(app)

export { handler as GET, handler as POST }
