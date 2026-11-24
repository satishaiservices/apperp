-- CreateTable
CREATE TABLE "activities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "activity_code" VARCHAR(40) NOT NULL,
    "name" VARCHAR(160) NOT NULL,
    "description" TEXT,
    "status" VARCHAR(30) NOT NULL DEFAULT 'NOT_STARTED',
    "priority" VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "start_date" DATE,
    "due_date" DATE,
    "completed_at" TIMESTAMPTZ(6),
    "estimated_cost" DECIMAL(14,2),
    "actual_cost" DECIMAL(14,2),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_assignments" (
    "tenant_id" UUID NOT NULL,
    "activity_id" UUID NOT NULL,
    "tenant_membership_id" UUID NOT NULL,
    "assigned_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_assignments_pkey" PRIMARY KEY ("tenant_id","activity_id","tenant_membership_id")
);

-- CreateIndex
CREATE INDEX "activities_tenant_id_project_id_status_idx" ON "activities"("tenant_id", "project_id", "status");

-- CreateIndex
CREATE INDEX "activities_tenant_id_status_idx" ON "activities"("tenant_id", "status");

-- CreateIndex
CREATE INDEX "activities_tenant_id_due_date_idx" ON "activities"("tenant_id", "due_date");

-- CreateIndex
CREATE UNIQUE INDEX "activities_tenant_id_id_key" ON "activities"("tenant_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "activities_tenant_id_project_id_activity_code_key" ON "activities"("tenant_id", "project_id", "activity_code");

-- CreateIndex
CREATE INDEX "activity_assignments_tenant_id_tenant_membership_id_idx" ON "activity_assignments"("tenant_id", "tenant_membership_id");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_tenant_id_project_id_fkey" FOREIGN KEY ("tenant_id", "project_id") REFERENCES "projects"("tenant_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_assignments" ADD CONSTRAINT "activity_assignments_tenant_id_activity_id_fkey" FOREIGN KEY ("tenant_id", "activity_id") REFERENCES "activities"("tenant_id", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_assignments" ADD CONSTRAINT "activity_assignments_tenant_id_tenant_membership_id_fkey" FOREIGN KEY ("tenant_id", "tenant_membership_id") REFERENCES "tenant_memberships"("tenant_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
