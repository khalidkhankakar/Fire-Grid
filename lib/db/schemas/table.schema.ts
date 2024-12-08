import { index, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

import board from "./board.schema";
import card from "./card.schema";





const table = pgTable(
    "table",
    {
        id: uuid("id").defaultRandom().unique().notNull(),
        title: varchar("name").notNull(),
        backgroundColor: varchar("background_color"),
        boardId: uuid("board_id").references(() => board.id).notNull(),
        position: integer("position").notNull(),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow(),
    },
    (t) => ({
        tableTitleIdx: index("table_title_idx").on(t.title),
        tableTitle: index("table_title_pg_trgm_idx").using(
            "gin",
            sql`${t.title} gin_trgm_ops`
          )
    })
);


export const tableRelations = relations(table, ({ many,one }) => ({
    tableCards: many(card),
    boardTable: one(board,{
        fields: [table.boardId],
        references: [board.id],
    } )
}))

export default table

