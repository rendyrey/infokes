ALTER TABLE "directories" DROP CONSTRAINT "directories_parent_id_directories_id_fk";
--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_directory_id_directories_id_fk";
--> statement-breakpoint
ALTER TABLE "directories" ADD CONSTRAINT "directories_parent_id_directories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."directories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_directory_id_directories_id_fk" FOREIGN KEY ("directory_id") REFERENCES "public"."directories"("id") ON DELETE cascade ON UPDATE no action;