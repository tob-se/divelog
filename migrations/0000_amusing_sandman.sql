CREATE TABLE IF NOT EXISTS "species" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"common_name" text,
	"oberservations" integer,
	"square_url" text,
	"medium_url" text
);
