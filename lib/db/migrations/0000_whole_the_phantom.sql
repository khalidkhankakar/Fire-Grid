CREATE TABLE IF NOT EXISTS "board" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"created_by" varchar NOT NULL,
	"description" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "board_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "card" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"description" varchar,
	"background_image" varchar,
	"table_id" uuid NOT NULL,
	"label" json,
	"card_deadline" timestamp,
	"position" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "card_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorite" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"board_id" uuid NOT NULL,
	"user_id" varchar NOT NULL,
	"org_id" varchar NOT NULL,
	CONSTRAINT "favorite_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "table" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"background_color" varchar,
	"board_id" uuid NOT NULL,
	"position" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "table_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"clerk_id" varchar NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"image" varchar,
	"password" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board" ADD CONSTRAINT "board_created_by_user_clerk_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("clerk_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card" ADD CONSTRAINT "card_table_id_table_id_fk" FOREIGN KEY ("table_id") REFERENCES "public"."table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite" ADD CONSTRAINT "favorite_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "table" ADD CONSTRAINT "table_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "board_title_idx" ON "board" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "board_title_pg_trgm_idx" ON "board" USING gin ("name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "card_title_idx" ON "card" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "card_title_pg_trgm_idx" ON "card" USING gin ("name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "fav_board_id_idx" ON "favorite" USING btree ("board_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "fav_user_board_idx" ON "favorite" USING btree ("user_id","board_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "table_title_idx" ON "table" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "table_title_pg_trgm_idx" ON "table" USING gin ("name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_clerk_id_idx" ON "user" USING btree ("clerk_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email_idx" ON "user" USING btree ("email");