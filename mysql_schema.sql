-- =============================================================================
-- CivilERP / Karya Setu - MySQL 8.0 / MariaDB Database Schema
-- Target Database: qraztxwf_apperp
-- Designed for: cPanel Shared Hosting & phpMyAdmin Direct Import
-- Character Set: utf8mb4 / utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET time_zone = '+00:00';

-- Drop existing tables in reverse dependency order for clean re-imports
DROP TABLE IF EXISTS ttendance_sessions;
DROP TABLE IF EXISTS site_submission_photos;
DROP TABLE IF EXISTS site_submission_activities;
DROP TABLE IF EXISTS site_submissions;
DROP TABLE IF EXISTS daily_progress_reports;
DROP TABLE IF EXISTS ctivity_assignments;
DROP TABLE IF EXISTS ctivities;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS udit_logs;
DROP TABLE IF EXISTS membership_roles;
DROP TABLE IF EXISTS 
ole_permissions;
DROP TABLE IF EXISTS 
oles;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS 	enant_memberships;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS 	enants;

-- CreateTable
CREATE TABLE `tenants` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(160) NOT NULL,
    `slug` VARCHAR(80) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    UNIQUE INDEX `tenants_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(36) NOT NULL,
    `full_name` VARCHAR(160) NOT NULL,
    `username` VARCHAR(60) NULL,
    `email` VARCHAR(254) NULL,
    `phone` VARCHAR(32) NULL,
    `emergency_phone` VARCHAR(32) NULL,
    `avatar_url` TEXT NULL,
    `password_hash` TEXT NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    `is_platform_admin` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    INDEX `users_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tenant_memberships` (
    `id` VARCHAR(36) NOT NULL,
    `tenant_id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `membership_status` VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    `joined_at` DATETIME(6) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    INDEX `tenant_memberships_user_id_idx`(`user_id`),
    INDEX `tenant_memberships_tenant_id_membership_status_idx`(`tenant_id`, `membership_status`),
    UNIQUE INDEX `tenant_memberships_tenant_id_user_id_key`(`tenant_id`, `user_id`),
    UNIQUE INDEX `tenant_memberships_tenant_id_id_key`(`tenant_id`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` VARCHAR(36) NOT NULL,
    `permission_key` VARCHAR(120) NOT NULL,
    `description` VARCHAR(255) NULL,

    UNIQUE INDEX `permissions_permission_key_key`(`permission_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` VARCHAR(36) NOT NULL,
    `tenant_id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(80) NOT NULL,
    `description` VARCHAR(255) NULL,
    `is_system_role` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `roles_tenant_id_idx`(`tenant_id`),
    UNIQUE INDEX `roles_tenant_id_id_key`(`tenant_id`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permissions` (
    `tenant_id` VARCHAR(36) NOT NULL,
    `role_id` VARCHAR(36) NOT NULL,
    `permission_id` VARCHAR(36) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `role_permissions_permission_id_idx`(`permission_id`),
    PRIMARY KEY (`tenant_id`, `role_id`, `permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `membership_roles` (
    `tenant_id` VARCHAR(36) NOT NULL,
    `tenant_membership_id` VARCHAR(36) NOT NULL,
    `role_id` VARCHAR(36) NOT NULL,
    `assigned_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `membership_roles_tenant_id_role_id_idx`(`tenant_id`, `role_id`),
    PRIMARY KEY (`tenant_id`, `tenant_membership_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` VARCHAR(36) NOT NULL,
    `tenant_id` VARCHAR(36) NOT NULL,
    `actor_membership_id` VARCHAR(36) NULL,
    `action` VARCHAR(120) NOT NULL,
    `entity_type` VARCHAR(80) NOT NULL,
    `entity_id` VARCHAR(36) NULL,
    `occurred_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `correlation_id` VARCHAR(36) NULL,
    `metadata` JSON NOT NULL,

    INDEX `audit_logs_tenant_id_occurred_at_idx`(`tenant_id`, `occurred_at` DESC),
    INDEX `audit_logs_tenant_id_entity_type_entity_id_idx`(`tenant_id`, `entity_type`, `entity_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` VARCHAR(36) NOT NULL,
    `tenant_id` VARCHAR(36) NOT NULL,
    `project_code` VARCHAR(40) NOT NULL,
    `name` VARCHAR(160) NOT NULL,
    `description` TEXT NULL,
    `client_name` VARCHAR(160) NULL,
    `site_address` TEXT NULL,
    `start_chainage` VARCHAR(50) NULL,
    `end_chainage` VARCHAR(50) NULL,
    `start_latitude` DECIMAL(10, 7) NULL,
    `start_longitude` DECIMAL(10, 7) NULL,
    `end_latitude` DECIMAL(10, 7) NULL,
    `end_longitude` DECIMAL(10, 7) NULL,
    `status` VARCHAR(30) NOT NULL DEFAULT 'PLANNING',
    `budget` DECIMAL(14, 2) NULL,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    INDEX `projects_tenant_id_status_idx`(`tenant_id`, `status`),
    INDEX `projects_tenant_id_created_at_idx`(`tenant_id`, `created_at` DESC),
    UNIQUE INDEX `projects_tenant_id_id_key`(`tenant_id`, `id`),
    UNIQUE INDEX `projects_tenant_id_project_code_key`(`tenant_id`, `project_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activities` (
    `id` VARCHAR(36) NOT NULL,
    `tenant_id` VARCHAR(36) NOT NULL,
    `project_id` VARCHAR(36) NOT NULL,
    `parent_id` VARCHAR(36) NULL,
    `activity_code` VARCHAR(40) NOT NULL,
    `name` VARCHAR(160) NOT NULL,
    `description` TEXT NULL,
    `unit` VARCHAR(30) NULL,
    `status` VARCHAR(30) NOT NULL DEFAULT 'NOT_STARTED',
    `priority` VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    `progress` INTEGER NOT NULL DEFAULT 0,
    `start_date` DATE NULL,
    `due_date` DATE NULL,
    `completed_at` DATETIME(6) NULL,
    `estimated_cost` DECIMAL(14, 2) NULL,
    `actual_cost` DECIMAL(14, 2) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    INDEX `activities_tenant_id_project_id_status_idx`(`tenant_id`, `project_id`, `status`),
    INDEX `activities_tenant_id_status_idx`(`tenant_id`, `status`),
    INDEX `activities_tenant_id_due_date_idx`(`tenant_id`, `due_date`),
    UNIQUE INDEX `activities_tenant_id_id_key`(`tenant_id`, `id`),
    UNIQUE INDEX `activities_tenant_id_project_id_activity_code_key`(`tenant_id`, `project_id`, `activity_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_assignments` (
    `tenant_id` VARCHAR(36) NOT NULL,
    `activity_id` VARCHAR(36) NOT NULL,
    `tenant_membership_id` VARCHAR(36) NOT NULL,
    `assigned_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `activity_assignments_tenant_id_tenant_membership_id_idx`(`tenant_id`, `tenant_membership_id`),
    PRIMARY KEY (`tenant_id`, `activity_id`, `tenant_membership_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `daily_progress_reports` (
    `id` VARCHAR(36) NOT NULL,
    `tenant_id` VARCHAR(36) NOT NULL,
    `project_id` VARCHAR(36) NOT NULL,
    `report_date` DATE NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    `weather` VARCHAR(120) NULL,
    `site_conditions` TEXT NULL,
    `workforce_count` INTEGER NOT NULL DEFAULT 0,
    `labour` JSON NOT NULL,
    `equipment` JSON NOT NULL,
    `materials` JSON NOT NULL,
    `work_progress` JSON NOT NULL,
    `attachments` JSON NOT NULL,
    `delays` TEXT NULL,
    `issues` TEXT NULL,
    `remarks` TEXT NULL,
    `prepared_by_membership_id` VARCHAR(36) NOT NULL,
    `reviewed_by_membership_id` VARCHAR(36) NULL,
    `review_remarks` TEXT NULL,
    `submitted_at` DATETIME(6) NULL,
    `reviewed_at` DATETIME(6) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    INDEX `daily_progress_reports_tenant_id_project_id_report_date_idx`(`tenant_id`, `project_id`, `report_date` DESC),
    INDEX `daily_progress_reports_tenant_id_status_idx`(`tenant_id`, `status`),
    UNIQUE INDEX `daily_progress_reports_tenant_id_id_key`(`tenant_id`, `id`),
    UNIQUE INDEX `daily_progress_reports_tenant_id_project_id_report_date_key`(`tenant_id`, `project_id`, `report_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_submissions` (
    `id` VARCHAR(36) NOT NULL,
    `tenant_id` VARCHAR(36) NOT NULL,
    `project_id` VARCHAR(36) NOT NULL,
    `supervisor_membership_id` VARCHAR(36) NOT NULL,
    `start_chainage` VARCHAR(50) NOT NULL,
    `end_chainage` VARCHAR(50) NOT NULL,
    `latitude` DECIMAL(10, 7) NOT NULL,
    `longitude` DECIMAL(10, 7) NOT NULL,
    `location_accuracy_m` DECIMAL(8, 2) NULL,
    `location_captured_at` DATETIME(6) NULL,
    `remarks` TEXT NULL,
    `submitted_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `site_submissions_tenant_id_project_id_submitted_at_idx`(`tenant_id`, `project_id`, `submitted_at` DESC),
    INDEX `site_submissions_tenant_id_supervisor_membership_id_submitte_idx`(`tenant_id`, `supervisor_membership_id`, `submitted_at` DESC),
    UNIQUE INDEX `site_submissions_tenant_id_id_key`(`tenant_id`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_submission_activities` (
    `tenant_id` VARCHAR(36) NOT NULL,
    `submission_id` VARCHAR(36) NOT NULL,
    `activity_id` VARCHAR(36) NOT NULL,

    INDEX `site_submission_activities_tenant_id_activity_id_idx`(`tenant_id`, `activity_id`),
    PRIMARY KEY (`tenant_id`, `submission_id`, `activity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_submission_photos` (
    `id` VARCHAR(36) NOT NULL,
    `tenant_id` VARCHAR(36) NOT NULL,
    `submission_id` VARCHAR(36) NOT NULL,
    `storage_key` VARCHAR(500) NOT NULL,
    `mime_type` VARCHAR(100) NOT NULL,
    `file_size` INTEGER NOT NULL,
    `captured_at` DATETIME(6) NULL,
    `uploaded_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `site_submission_photos_tenant_id_submission_id_idx`(`tenant_id`, `submission_id`),
    UNIQUE INDEX `site_submission_photos_tenant_id_id_key`(`tenant_id`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance_sessions` (
    `id` VARCHAR(36) NOT NULL,
    `tenant_id` VARCHAR(36) NOT NULL,
    `supervisor_membership_id` VARCHAR(36) NOT NULL,
    `project_id` VARCHAR(36) NOT NULL,
    `check_in_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `check_out_at` DATETIME(6) NULL,
    `latitude` DECIMAL(10, 7) NULL,
    `longitude` DECIMAL(10, 7) NULL,
    `location_accuracy_m` DECIMAL(8, 2) NULL,
    `checkout_latitude` DECIMAL(10, 7) NULL,
    `checkout_longitude` DECIMAL(10, 7) NULL,
    `checkout_accuracy_m` DECIMAL(8, 2) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    `remarks` TEXT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    INDEX `attendance_sessions_tenant_id_supervisor_membership_id_statu_idx`(`tenant_id`, `supervisor_membership_id`, `status`),
    INDEX `attendance_sessions_tenant_id_project_id_check_in_at_idx`(`tenant_id`, `project_id`, `check_in_at` DESC),
    UNIQUE INDEX `attendance_sessions_tenant_id_id_key`(`tenant_id`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tenant_memberships` ADD CONSTRAINT `tenant_memberships_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tenant_memberships` ADD CONSTRAINT `tenant_memberships_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roles` ADD CONSTRAINT `roles_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_tenant_id_role_id_fkey` FOREIGN KEY (`tenant_id`, `role_id`) REFERENCES `roles`(`tenant_id`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `membership_roles` ADD CONSTRAINT `membership_roles_tenant_id_tenant_membership_id_fkey` FOREIGN KEY (`tenant_id`, `tenant_membership_id`) REFERENCES `tenant_memberships`(`tenant_id`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `membership_roles` ADD CONSTRAINT `membership_roles_tenant_id_role_id_fkey` FOREIGN KEY (`tenant_id`, `role_id`) REFERENCES `roles`(`tenant_id`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_tenant_id_actor_membership_id_fkey` FOREIGN KEY (`tenant_id`, `actor_membership_id`) REFERENCES `tenant_memberships`(`tenant_id`, `id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_tenant_id_project_id_fkey` FOREIGN KEY (`tenant_id`, `project_id`) REFERENCES `projects`(`tenant_id`, `id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `activities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity_assignments` ADD CONSTRAINT `activity_assignments_tenant_id_activity_id_fkey` FOREIGN KEY (`tenant_id`, `activity_id`) REFERENCES `activities`(`tenant_id`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity_assignments` ADD CONSTRAINT `activity_assignments_tenant_id_tenant_membership_id_fkey` FOREIGN KEY (`tenant_id`, `tenant_membership_id`) REFERENCES `tenant_memberships`(`tenant_id`, `id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_progress_reports` ADD CONSTRAINT `daily_progress_reports_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_progress_reports` ADD CONSTRAINT `daily_progress_reports_tenant_id_project_id_fkey` FOREIGN KEY (`tenant_id`, `project_id`) REFERENCES `projects`(`tenant_id`, `id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_progress_reports` ADD CONSTRAINT `daily_progress_reports_tenant_id_prepared_by_membership_id_fkey` FOREIGN KEY (`tenant_id`, `prepared_by_membership_id`) REFERENCES `tenant_memberships`(`tenant_id`, `id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_progress_reports` ADD CONSTRAINT `daily_progress_reports_tenant_id_reviewed_by_membership_id_fkey` FOREIGN KEY (`tenant_id`, `reviewed_by_membership_id`) REFERENCES `tenant_memberships`(`tenant_id`, `id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_submissions` ADD CONSTRAINT `site_submissions_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_submissions` ADD CONSTRAINT `site_submissions_tenant_id_project_id_fkey` FOREIGN KEY (`tenant_id`, `project_id`) REFERENCES `projects`(`tenant_id`, `id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_submissions` ADD CONSTRAINT `site_submissions_tenant_id_supervisor_membership_id_fkey` FOREIGN KEY (`tenant_id`, `supervisor_membership_id`) REFERENCES `tenant_memberships`(`tenant_id`, `id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_submission_activities` ADD CONSTRAINT `site_submission_activities_tenant_id_submission_id_fkey` FOREIGN KEY (`tenant_id`, `submission_id`) REFERENCES `site_submissions`(`tenant_id`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_submission_activities` ADD CONSTRAINT `site_submission_activities_tenant_id_activity_id_fkey` FOREIGN KEY (`tenant_id`, `activity_id`) REFERENCES `activities`(`tenant_id`, `id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_submission_photos` ADD CONSTRAINT `site_submission_photos_tenant_id_submission_id_fkey` FOREIGN KEY (`tenant_id`, `submission_id`) REFERENCES `site_submissions`(`tenant_id`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_sessions` ADD CONSTRAINT `attendance_sessions_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_sessions` ADD CONSTRAINT `attendance_sessions_tenant_id_project_id_fkey` FOREIGN KEY (`tenant_id`, `project_id`) REFERENCES `projects`(`tenant_id`, `id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_sessions` ADD CONSTRAINT `attendance_sessions_tenant_id_supervisor_membership_id_fkey` FOREIGN KEY (`tenant_id`, `supervisor_membership_id`) REFERENCES `tenant_memberships`(`tenant_id`, `id`) ON DELETE RESTRICT ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;
