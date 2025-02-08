CREATE TYPE "public"."file_type" AS ENUM('pdf', 'docx', 'txt', 'jpg');--> statement-breakpoint
CREATE TABLE "directories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "directories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"parent_id" integer,
	"name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "files_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"directory_id" integer,
	"name" varchar NOT NULL,
	"file_type" "file_type" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "directories" ADD CONSTRAINT "directories_parent_id_directories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."directories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_directory_id_directories_id_fk" FOREIGN KEY ("directory_id") REFERENCES "public"."directories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "directories_parent_id_idx" ON "directories" USING btree ("parent_id","name");--> statement-breakpoint
CREATE INDEX "directories_created_at_idx" ON "directories" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "directories_updated_at_idx" ON "directories" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "files_directory_id_idx" ON "files" USING btree ("directory_id");--> statement-breakpoint
CREATE INDEX "files_name_idx" ON "files" USING btree ("name");--> statement-breakpoint
CREATE INDEX "files_created_at_idx" ON "files" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "files_updated_at_idx" ON "files" USING btree ("updated_at");