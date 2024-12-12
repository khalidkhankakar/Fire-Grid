'use server';

import { auth, clerkClient } from "@clerk/nextjs/server";

export const updateUserMetadataDashboardTour = async () => {
    const user = await clerkClient();
    const { userId } = await auth();
    if(!userId) return
    await user?.users.updateUserMetadata(userId,{
        publicMetadata: {
            dashboardTour: true
        }
    })
}
