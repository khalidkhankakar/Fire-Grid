'use server';

import { db } from "@/lib/db/drizzle";
import { card, table } from "@/lib/db/schemas";
import { boardFromState, formResponseStatus } from "@/types";
import { eq } from "drizzle-orm";




export const createCard = async (values: {tableId: string, title: string, position: number}): Promise<boardFromState> => {
    try {
        const {tableId, title, position} = values
        const tableExists = await db.query.table.findFirst({ where: eq(table.id, tableId) })
        if(!tableExists) return { status: formResponseStatus.TABLE_NOT_EXISTS, success: false };
        await db.insert(card).values({
            title,
            tableId,
            position
        })
        return { status: formResponseStatus.CARD_CREATED, success: true }
    } catch (error) {
        console.log(error)
        return { status: formResponseStatus.ERROR, success: false }
    }
}