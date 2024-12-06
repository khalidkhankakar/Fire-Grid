CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"image" varchar,
	"password" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
