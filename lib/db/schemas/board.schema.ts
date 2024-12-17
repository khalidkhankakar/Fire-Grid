import {  relations, sql } from "drizzle-orm";
import { index,  pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import user from "./user.schema";
import favorite from "./favorite.schema";
import table from "./table.schema";




const board = pgTable(
    "board",
    {
        id: uuid("id").defaultRandom().unique().notNull(),
        title: varchar("name").notNull(),
        createdBy: varchar("created_by").notNull().references(() => user.clerkId),
        image: varchar("image").notNull(),
        category: varchar("category").notNull(),
        visibility: varchar("visibility").notNull(),
        type: varchar("type"),
        orgId: varchar("org_id"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow(),
    },
    // Apply the pg_trgm extension to the title column for fuzzy searching
    (t) => ({
        boardTitleIdx: index("board_title_idx").on(t.title),
        boardTitle: index("board_title_pg_trgm_idx").using(
            "gin",
            sql`${t.title} gin_trgm_ops`
          )
    })
);



export const boardRelations = relations(board, ({ many,one }) => ({
    boardFavorites: many(favorite),
    boardTables: many(table),
    boardCreator: one(user,{
        fields: [board.createdBy],
        references: [user.clerkId],
    } )
}))


export default board;