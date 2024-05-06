ALTER TABLE "species" RENAME COLUMN "oberservations" TO "observations";--> statement-breakpoint
ALTER TABLE "species" ALTER COLUMN "observations" SET NOT NULL;