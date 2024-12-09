import {
  index,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import board from "./board.schema";
 
const user = pgTable(
  "user",
  {
    clerkId: varchar("clerk_id").notNull().unique(),
    name: varchar("name").notNull(),
    email: varchar("email").unique().notNull(),
    image: varchar("image"),
    password: varchar("password"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  }, (t) => ({
    clerkIdIdx: index("user_clerk_id_idx").on(t.clerkId),
    emailIdx: index("user_email_idx").on(t.email),
  })
);


export const userRelations = relations(user, ({ many }) => ({
  userBoards: many(board),
}))


export default user;