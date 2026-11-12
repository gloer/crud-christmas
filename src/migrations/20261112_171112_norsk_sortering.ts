import {
  type MigrateUpArgs,
  type MigrateDownArgs,
  sql,
} from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE COLLATION "public"."julegaver_norsk"
      (provider = icu, locale = 'nb', deterministic = true);

    ALTER TABLE "public"."julegaver"
      ALTER COLUMN "betegnelse"
        TYPE varchar COLLATE "public"."julegaver_norsk",
      ALTER COLUMN "mottaker"
        TYPE varchar COLLATE "public"."julegaver_norsk";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "public"."julegaver"
      ALTER COLUMN "betegnelse"
        TYPE varchar COLLATE "default",
      ALTER COLUMN "mottaker"
        TYPE varchar COLLATE "default";

    DROP COLLATION "public"."julegaver_norsk";
  `)
}