ALTER TABLE "card" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "card" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "card" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "card" ADD COLUMN "background_color" varchar;