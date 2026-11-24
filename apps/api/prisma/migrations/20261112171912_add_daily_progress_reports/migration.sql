-- CreateTable
CREATE TABLE "daily_progress_reports" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "report_date" DATE NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    "weather" VARCHAR(120),
    "site_conditions" TEXT,
    "workforce_count" INTEGER NOT NULL DEFAULT 0,
    "labour" JSONB NOT NULL DEFAULT '[]',
    "equipment" JSONB NOT NULL DEFAULT '[]',
    "materials" JSONB NOT NULL DEFAULT '[]',
    "work_progress" JSONB NOT NULL DEFAULT '[]',
    "attachments" JSONB NOT NULL DEFAULT '[]',
    "delays" TEXT,
    "issues" TEXT,
    "remarks" TEXT,
    "prepared_by_membership_id" UUID NOT NULL,
    "reviewed_by_membership_id" UUID,
    "review_remarks" TEXT,
    "submitted_at" TIMESTAMPTZ(6),
    "reviewed_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "daily_progress_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "daily_progress_reports_tenant_id_project_id_report_date_idx" ON "daily_progress_reports"("tenant_id", "project_id", "report_date" DESC);

-- CreateIndex
CREATE INDEX "daily_progress_reports_tenant_id_status_idx" ON "daily_progress_reports"("tenant_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "daily_progress_reports_tenant_id_id_key" ON "daily_progress_reports"("tenant_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "daily_progress_reports_tenant_id_project_id_report_date_key" ON "daily_progress_reports"("tenant_id", "project_id", "report_date");

-- AddForeignKey
ALTER TABLE "daily_progress_reports" ADD CONSTRAINT "daily_progress_reports_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_progress_reports" ADD CONSTRAINT "daily_progress_reports_tenant_id_project_id_fkey" FOREIGN KEY ("tenant_id", "project_id") REFERENCES "projects"("tenant_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_progress_reports" ADD CONSTRAINT "daily_progress_reports_tenant_id_prepared_by_membership_id_fkey" FOREIGN KEY ("tenant_id", "prepared_by_membership_id") REFERENCES "tenant_memberships"("tenant_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_progress_reports" ADD CONSTRAINT "daily_progress_reports_tenant_id_reviewed_by_membership_id_fkey" FOREIGN KEY ("tenant_id", "reviewed_by_membership_id") REFERENCES "tenant_memberships"("tenant_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
