'use server';

import { db } from "@/lib/db/drizzle";
import { user } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";

export const createUser = async (values: {
    clerkId: string,
    name: string,
    email: string,
    image: string
}) => {
    try {
        const userId = await db.insert(user).values({
            clerkId: values.clerkId,
            name: values.name,
            email: values.email,
            image: values.image
        }).returning({ id: user.clerkId });
        return userId
    } catch (error) {
        throw error
    }
}


export const updateUser = async (values: {
    clerkId: string,
    name: string,
    email: string,
    image: string
}) => {
    try {
        const userId = await db.update(user)
            .set({
                name: values.name,
                email: values.email,
                image: values.image
            }).where(eq(user.clerkId, values.clerkId)).returning({ id: user.clerkId });
        return userId;
    } catch (error) {
        throw error
    }
}

export const deleteUser = async (values: {
    clerkId: string,
}) => {
    try {
        const userId = await db.delete(user).where(eq(user.clerkId, values.clerkId as string)).returning({ id: user.clerkId });
        return userId;
    } catch (error) {
        throw error
    }
}