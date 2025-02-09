DROP INDEX "directories_created_at_idx";--> statement-breakpoint
DROP INDEX "directories_updated_at_idx";--> statement-breakpoint
DROP INDEX "files_created_at_idx";--> statement-breakpoint
DROP INDEX "files_updated_at_idx";--> statement-breakpoint
ALTER TABLE "directories" ADD CONSTRAINT "directories_name_parent_id_unique_idx" UNIQUE("name","parent_id");--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_name_directory_id_unique_idx" UNIQUE("name","directory_id","file_type");