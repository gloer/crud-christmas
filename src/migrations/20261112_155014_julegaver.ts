import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "julegaver" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"betegnelse" varchar NOT NULL,
  	"mottaker" varchar NOT NULL,
  	"pris" numeric NOT NULL,
  	"kjopt" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "julegaver_id" integer;
  CREATE INDEX "julegaver_updated_at_idx" ON "julegaver" USING btree ("updated_at");
  CREATE INDEX "julegaver_created_at_idx" ON "julegaver" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_julegaver_fk" FOREIGN KEY ("julegaver_id") REFERENCES "public"."julegaver"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_julegaver_id_idx" ON "payload_locked_documents_rels" USING btree ("julegaver_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "julegaver" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "julegaver" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_julegaver_fk";
  
  DROP INDEX "payload_locked_documents_rels_julegaver_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "julegaver_id";`)
}
