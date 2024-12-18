'use server';

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db/drizzle";
import { card, table } from "@/lib/db/schemas";
import { LabelType } from "@/lib/db/schemas/card.schema";
import { taskSchema } from "@/lib/utils";

import { boardFromState, formResponseStatus } from "@/types";




export const createCard = async (values: {tableId: string, title: string, position: number}): Promise<boardFromState> => {
    try {
        const {tableId, title, position} = values
        const tableExists = await db.query.table.findFirst({ where: eq(table.id, tableId) })
        if(!tableExists) return { status: formResponseStatus.TABLE_NOT_EXISTS, success: false };
        await db.insert(card).values({
            title,
            tableId,
            position
        }).returning({ id: card.id })
        return { status: formResponseStatus.CARD_CREATED, success: true }
    } catch (error) {
        console.log(error)
        return { status: formResponseStatus.ERROR, success: false }
    }
}


export const updatedCard = async (values: z.infer<typeof taskSchema>): Promise<boardFromState> => {
    try {
        const parse = taskSchema.safeParse(values);

        if(!parse.success) return { status: formResponseStatus.CARD_INVALID_FIELDS, success: false };

        const {id,cardColor,coverImage,description,deadline,labels,position,title} = parse.data;

        const lablesString: LabelType = { 
            data: labels?.map(label => ({ title: label.title, color: label.color })) || [] 
        };
        
        await db.update(card).set({ backgroundColor: cardColor, backgroundImage: coverImage, description, taskDeadline: deadline, label: lablesString , position, title  }).where(eq(card.id, id))
        return { status: formResponseStatus.CARD_UPDATED, success: true }
    } catch (error) {
        console.log({error})
        return { status: formResponseStatus.ERROR, success: false }
    }

}

// TODO : Delete card
// export const deleteCard = async (value: { cardId: string }): Promise<boardFromState> => {}

export const updateCardPosition = async (values: { cardId: string, tableId: string, position: number }): Promise<boardFromState> => {
    try {
        const { cardId,tableId, position } = values
        await db.update(card).set({tableId, position }).where(eq(card.id, cardId))
        return { status: formResponseStatus.CARD_UPDATED, success: true }
    } catch (error) {
        console.log(error)
        return { status: formResponseStatus.ERROR, success: false }
    }
}