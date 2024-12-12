import { index, integer, json, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, relations, sql } from "drizzle-orm";

import table from "./table.schema";

export type LabelType = { data: { title: string; color: string }[] };


const card = pgTable(
    "card",
    {
        id: uuid("id").defaultRandom().unique().notNull(),
        title: varchar("name").notNull(),
        description: varchar("description"),
        backgroundImage: varchar("background_image"),
        tableId: uuid("table_id").references(() => table.id).notNull(),
        label:json("label").$type<LabelType>(),
        backgroundColor: varchar("background_color"),
        taskDeadline: varchar("card_deadline"),
        position: integer("position").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },(t) => ({
        cardTitleIdx: index("card_title_idx").on(t.title),
        cardTitle: index("card_title_pg_trgm_idx").using(
            "gin",
            sql`${t.title} gin_trgm_ops`
          )
    })
);

export type CardType = InferSelectModel<typeof card>

export const cardRelations = relations(card, ({ one }) => ({
    tableCard: one(table,{
        fields: [card.tableId],
        references: [table.id],
    } )
}))

export default card