"use server";

import { db } from "@/lib/db/drizzle";
import { board, table } from "@/lib/db/schemas";
import { boardFromState, formResponseStatus } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createTable = async (boardId: string, position: number, title: string): Promise<boardFromState> => {

    try {
        const boardExists = await db.query.board.findFirst({ where: eq(board.id, boardId) })
        if (!boardExists) return { success: false, status: formResponseStatus.BOARD_NOT_EXISTS };

        await db.insert(table).values({
            title,
            boardId,
            position
        })

        revalidatePath(`/board/${boardId}`)
        return { success: true, status: formResponseStatus.TABLE_CREATED };

    } catch (error) {
        console.log(error)
        return { success: false, status: formResponseStatus.ERROR };
    }

}


export const getTable = async (tableId: string) => {
    try {
        const result = await db.query.table.findFirst({
            where: eq(table.id, tableId)
            ,
            with: {
                tableCards: true
            }
        })
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}