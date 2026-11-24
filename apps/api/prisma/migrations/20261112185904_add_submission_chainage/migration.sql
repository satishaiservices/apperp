-- Add nullable columns first so existing submissions remain valid.
ALTER TABLE "site_submissions"
ADD COLUMN "start_chainage" VARCHAR(50),
ADD COLUMN "end_chainage" VARCHAR(50);

-- Backfill existing submissions with an explicit legacy placeholder.
UPDATE "site_submissions"
SET
    "start_chainage" = 'LEGACY-UNKNOWN',
    "end_chainage" = 'LEGACY-UNKNOWN';

-- Enforce required values for all future submissions.
ALTER TABLE "site_submissions"
ALTER COLUMN "start_chainage" SET NOT NULL,
ALTER COLUMN "end_chainage" SET NOT NULL;
