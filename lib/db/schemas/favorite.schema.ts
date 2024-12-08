import { index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import board from "./board.schema";




const favorite = pgTable(
    "favorite",
    {
        id: uuid("id").defaultRandom().unique().notNull(),
        boardId: uuid("board_id").references(() => board.id).notNull(),
        userId: varchar("user_id").notNull(),
        orgId: varchar("org_id").notNull(),
    }
    , (t) => ({
        boardIdIdx: index("fav_board_id_idx").on(t.boardId),
        userBoardIdx: index("fav_user_board_idx").on(t.userId, t.boardId)
}))


export const favoriteRelations = relations(favorite, ({ one }) => ({
    favoriteBoard: one(board, {
        fields: [favorite.boardId],
        references: [board.id],
    }),
}));

export default favorite
