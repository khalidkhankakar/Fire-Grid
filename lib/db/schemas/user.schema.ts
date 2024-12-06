import {
    pgTable,
    timestamp,
    uuid,
    varchar,
  } from "drizzle-orm/pg-core";
  
  const user = pgTable(
    "user",
    {
      id: uuid("id").defaultRandom().unique(),
      name: varchar("name").notNull(),
      email: varchar("email").unique().notNull(),
      image: varchar("image"),
      password: varchar("password"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow(),
    }
  );
  
  
  export default user;