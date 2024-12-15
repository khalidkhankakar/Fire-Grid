'use server';

import { db } from "@/lib/db/drizzle";
import { board } from "@/lib/db/schemas";
import { boardFormSchema } from "@/lib/utils";
import { formResponseStatus, boardFromState } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createBoard = async (values: z.infer<typeof boardFormSchema>): Promise<boardFromState> => {
    const parse = boardFormSchema.safeParse(values);
    if (!parse.success) return { success: false, status: formResponseStatus.BOARD_INVALID_FIELDS };

    const { background, category, orgId,title, visibility } = parse.data;
    
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, status: formResponseStatus.USER_NOT_EXISTS };
        if (visibility === 'team' && !orgId) return { success: false, status: formResponseStatus.ORG_NOT_EXISTS };

        await db.insert(board).values({
            title,
            image: background,
            createdBy: userId,
            category,
            visibility,
            orgId: visibility === 'team' ? orgId : null, // Only insert orgId if visibility is 'team'
            position: 0,
        });
        revalidatePath('/dashboard')
        return { success: true, status: formResponseStatus.BOARD_CREATED };

    } catch (error) {
        console.error(error);
        return { success: false, status: formResponseStatus.ERROR };
    }
};


export const getBoard = async (boardId:string) =>{
    try {
        const myBoard = await db.query.board.findFirst({
            where: eq(board.id, boardId),
            with: {
                boardTables: {
                    with:{
                        tableCards: true
                    }
                }

            }
        })

        const sortedByPosition = myBoard?.boardTables.sort((a, b) => a.position - b.position);
        return {...myBoard, boardTables:sortedByPosition};
    } catch (error) {
        console.error(error);
    }
}

export const getSingleBoard = async (id:string) => {
    try {
        const myBoard = await db.query.board.findFirst({
            where: eq(board.id, id)
        })
        return myBoard;
    } catch (error) {
        console.error(error);
    }
}

export const deleteBoard = async (value: { boardId: string }): Promise<boardFromState> => {
    try {
        await db.delete(board).where(eq(board.id, value.boardId))
        revalidatePath('/dashboard')
        return { success: true, status: formResponseStatus.BOARD_DELETED };
    } catch (error) {
        console.log(error)
        return { success: false, status: formResponseStatus.ERROR };
    }

}

export const renameBoard = async (value: { title:string,boardId: string }): Promise<boardFromState> => {
    try {
        await db.update(board).set({ title: value.title }).where(eq(board.id, value.boardId))
        revalidatePath('/dashboard')
        return { success: true, status: formResponseStatus.BOARD_DELETED };
    } catch (error) {
        console.log(error)
        return { success: false, status: formResponseStatus.ERROR };
    }

}