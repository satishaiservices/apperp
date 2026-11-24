-- CreateTable
CREATE TABLE "attendance_sessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID NOT NULL,
    "supervisor_membership_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "check_in_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "check_out_at" TIMESTAMPTZ(6),
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "location_accuracy_m" DECIMAL(8,2),
    "status" VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    "remarks" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "attendance_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "attendance_sessions_tenant_id_supervisor_membership_id_stat_idx" ON "attendance_sessions"("tenant_id", "supervisor_membership_id", "status");

-- CreateIndex
CREATE INDEX "attendance_sessions_tenant_id_project_id_check_in_at_idx" ON "attendance_sessions"("tenant_id", "project_id", "check_in_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "attendance_sessions_tenant_id_id_key" ON "attendance_sessions"("tenant_id", "id");

-- AddForeignKey
ALTER TABLE "attendance_sessions" ADD CONSTRAINT "attendance_sessions_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_sessions" ADD CONSTRAINT "attendance_sessions_tenant_id_project_id_fkey" FOREIGN KEY ("tenant_id", "project_id") REFERENCES "projects"("tenant_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_sessions" ADD CONSTRAINT "attendance_sessions_tenant_id_supervisor_membership_id_fkey" FOREIGN KEY ("tenant_id", "supervisor_membership_id") REFERENCES "tenant_memberships"("tenant_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
