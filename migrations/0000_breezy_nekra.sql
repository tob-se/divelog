DO $$ BEGIN
 CREATE TYPE "public"."dive_time" AS ENUM('morning', 'noon', 'afternoon', 'night');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dive" (
	"id" uuid PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"place_id" text NOT NULL,
	"place_main_text" text NOT NULL,
	"place_secondary_text" text,
	"dive_site" text NOT NULL,
	"comment" text NOT NULL,
	"highlight" boolean NOT NULL,
	"dive_time" "dive_time" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "observation" (
	"dive_id" uuid NOT NULL,
	"specie_id" integer NOT NULL,
	"amount" integer NOT NULL,
	CONSTRAINT "observation_dive_id_specie_id_pk" PRIMARY KEY("dive_id","specie_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "specie" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"common_name" text,
	"observations" integer NOT NULL,
	"square_url" text,
	"medium_url" text,
	"wikipedia_url" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "observation" ADD CONSTRAINT "observation_dive_id_dive_id_fk" FOREIGN KEY ("dive_id") REFERENCES "public"."dive"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "observation" ADD CONSTRAINT "observation_specie_id_specie_id_fk" FOREIGN KEY ("specie_id") REFERENCES "public"."specie"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
