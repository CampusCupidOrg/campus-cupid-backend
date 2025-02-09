CREATE TYPE "public"."status" AS ENUM('pending', 'accepted');--> statement-breakpoint
CREATE TABLE "results" (
	"id" serial PRIMARY KEY NOT NULL,
	"user1" text NOT NULL,
	"user2" text NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_crushes" (
	"id" serial PRIMARY KEY NOT NULL,
	"net_id" text NOT NULL,
	"position" integer NOT NULL,
	"crush_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"net_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_user1_users_net_id_fk" FOREIGN KEY ("user1") REFERENCES "public"."users"("net_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_user2_users_net_id_fk" FOREIGN KEY ("user2") REFERENCES "public"."users"("net_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_crushes" ADD CONSTRAINT "user_crushes_net_id_users_net_id_fk" FOREIGN KEY ("net_id") REFERENCES "public"."users"("net_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_crushes" ADD CONSTRAINT "user_crushes_crush_id_users_net_id_fk" FOREIGN KEY ("crush_id") REFERENCES "public"."users"("net_id") ON DELETE no action ON UPDATE no action;