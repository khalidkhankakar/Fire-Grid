'use server';

import { revalidatePath } from "next/cache";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";
import { board, favorite } from "@/lib/db/schemas";

import { boardFromState, formResponseStatus } from "@/types";


export const addFavorite = async (values:{ boardId: string, userId: string }): Promise<boardFromState> => {
try {
    
    if (!values.userId) return { success: false, status: formResponseStatus.USER_NOT_EXISTS };

    const boardExists = await db.query.board.findFirst({ where: eq(board.id, values.boardId) })
    if (!boardExists) return { success: false, status: formResponseStatus.BOARD_NOT_EXISTS };

    await db.insert(favorite).values({
        boardId: values.boardId,
        userId: values.userId,
    })
    revalidatePath('/dashboard')
    return { success: true, status: formResponseStatus.ADD_FAVORITE };
} catch (error) {
    console.log(error)
    return { success: false, status: formResponseStatus.ERROR };
}
}

export const removeFavorite = async (values:{ boardId: string, userId: string }): Promise<boardFromState> => {
    try {
        
        if (!values.userId) return { success: false, status: formResponseStatus.USER_NOT_EXISTS };

        await db.delete(favorite).where(and(eq(favorite.boardId, values.boardId), eq(favorite.userId, values.userId)))
        
        revalidatePath('/dashboard')
        return { success: true, status: formResponseStatus.REMOVE_FAVORITE};
    } catch (error) {
        console.log(error)
        return { success: false, status: formResponseStatus.ERROR };
    }
    }