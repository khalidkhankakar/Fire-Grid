ALTER TABLE "board" RENAME COLUMN "description" TO "image";--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "category" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "visibility" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "org_id" varchar;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "position" integer NOT NULL;