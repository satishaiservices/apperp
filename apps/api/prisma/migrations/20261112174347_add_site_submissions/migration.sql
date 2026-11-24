-- CreateTable
CREATE TABLE "site_submissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "supervisor_membership_id" UUID NOT NULL,
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,
    "location_accuracy_m" DECIMAL(8,2),
    "location_captured_at" TIMESTAMPTZ(6),
    "remarks" TEXT,
    "submitted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_submission_activities" (
    "tenant_id" UUID NOT NULL,
    "submission_id" UUID NOT NULL,
    "activity_id" UUID NOT NULL,

    CONSTRAINT "site_submission_activities_pkey" PRIMARY KEY ("tenant_id","submission_id","activity_id")
);

-- CreateTable
CREATE TABLE "site_submission_photos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID NOT NULL,
    "submission_id" UUID NOT NULL,
    "storage_key" VARCHAR(500) NOT NULL,
    "mime_type" VARCHAR(100) NOT NULL,
    "file_size" INTEGER NOT NULL,
    "captured_at" TIMESTAMPTZ(6),
    "uploaded_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_submission_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "site_submissions_tenant_id_project_id_submitted_at_idx" ON "site_submissions"("tenant_id", "project_id", "submitted_at" DESC);

-- CreateIndex
CREATE INDEX "site_submissions_tenant_id_supervisor_membership_id_submitt_idx" ON "site_submissions"("tenant_id", "supervisor_membership_id", "submitted_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "site_submissions_tenant_id_id_key" ON "site_submissions"("tenant_id", "id");

-- CreateIndex
CREATE INDEX "site_submission_activities_tenant_id_activity_id_idx" ON "site_submission_activities"("tenant_id", "activity_id");

-- CreateIndex
CREATE INDEX "site_submission_photos_tenant_id_submission_id_idx" ON "site_submission_photos"("tenant_id", "submission_id");

-- CreateIndex
CREATE UNIQUE INDEX "site_submission_photos_tenant_id_id_key" ON "site_submission_photos"("tenant_id", "id");

-- AddForeignKey
ALTER TABLE "site_submissions" ADD CONSTRAINT "site_submissions_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_submissions" ADD CONSTRAINT "site_submissions_tenant_id_project_id_fkey" FOREIGN KEY ("tenant_id", "project_id") REFERENCES "projects"("tenant_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_submissions" ADD CONSTRAINT "site_submissions_tenant_id_supervisor_membership_id_fkey" FOREIGN KEY ("tenant_id", "supervisor_membership_id") REFERENCES "tenant_memberships"("tenant_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_submission_activities" ADD CONSTRAINT "site_submission_activities_tenant_id_submission_id_fkey" FOREIGN KEY ("tenant_id", "submission_id") REFERENCES "site_submissions"("tenant_id", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_submission_activities" ADD CONSTRAINT "site_submission_activities_tenant_id_activity_id_fkey" FOREIGN KEY ("tenant_id", "activity_id") REFERENCES "activities"("tenant_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_submission_photos" ADD CONSTRAINT "site_submission_photos_tenant_id_submission_id_fkey" FOREIGN KEY ("tenant_id", "submission_id") REFERENCES "site_submissions"("tenant_id", "id") ON DELETE CASCADE ON UPDATE CASCADE;
