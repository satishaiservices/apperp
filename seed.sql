-- =============================================================================
-- CivilERP / Karya Setu - MySQL 8.0 / MariaDB Seed Data
-- Target Database: qraztxwf_apperp
-- Designed for: cPanel Shared Hosting & phpMyAdmin Direct Import
-- Character Set: utf8mb4 / utf8mb4_unicode_ci
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET time_zone = '+00:00';

-- -----------------------------------------------------------------------------
-- 1. Default Company / Tenant: YEC India
-- -----------------------------------------------------------------------------
INSERT IGNORE INTO `tenants` (`id`, `name`, `slug`, `status`, `created_at`, `updated_at`)
VALUES
('c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'YEC India', 'yec-india', 'ACTIVE', NOW(6), NOW(6));

-- -----------------------------------------------------------------------------
-- 2. Core RBAC Permissions Catalog
-- -----------------------------------------------------------------------------
INSERT IGNORE INTO `permissions` (`id`, `permission_key`, `description`) VALUES
('perm-0001-0000-0000-000000000001', 'projects.view', 'View project details and milestones'),
('perm-0001-0000-0000-000000000002', 'projects.create', 'Create civil engineering projects'),
('perm-0001-0000-0000-000000000003', 'projects.update', 'Update project configuration and metadata'),
('perm-0001-0000-0000-000000000004', 'activities.view', 'View site activities and WBS work packages'),
('perm-0001-0000-0000-000000000005', 'activities.create', 'Create site activities and sub-activities'),
('perm-0001-0000-0000-000000000006', 'activities.update', 'Update site activity progress and status'),
('perm-0001-0000-0000-000000000007', 'submissions.create', 'Submit site progress logs with GPS-tagged photos'),
('perm-0001-0000-0000-000000000008', 'submissions.view', 'View field submissions and evidence photos'),
('perm-0001-0000-0000-000000000009', 'dprs.create', 'Draft Daily Progress Reports (DPR)'),
('perm-0001-0000-0000-000000000010', 'dprs.view', 'View submitted Daily Progress Reports'),
('perm-0001-0000-0000-000000000011', 'dprs.submit', 'Submit Daily Progress Reports for approval'),
('perm-0001-0000-0000-000000000012', 'reports.view', 'View analytics, executive dashboards, and export reports'),
('perm-0001-0000-0000-000000000013', 'users.view', 'View team members, supervisors, and assignments');

-- -----------------------------------------------------------------------------
-- 3. Tenant Roles (SUPERVISOR, TENANT_ADMIN, ADMIN)
-- -----------------------------------------------------------------------------
INSERT IGNORE INTO `roles` (`id`, `tenant_id`, `name`, `description`, `is_system_role`, `created_at`) VALUES
('role-0001-0000-0000-000000000001', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'SUPERVISOR', 'Civil Site Supervisor & Field Operations', 0, NOW(6)),
('role-0001-0000-0000-000000000002', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'TENANT_ADMIN', 'Organization Administrator with Full Access', 1, NOW(6)),
('role-0001-0000-0000-000000000003', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'ADMIN', 'Company Administrator', 1, NOW(6));

-- -----------------------------------------------------------------------------
-- 4. Role Permissions Assignment
-- -----------------------------------------------------------------------------
-- Grant permissions to SUPERVISOR role
INSERT IGNORE INTO `role_permissions` (`tenant_id`, `role_id`, `permission_id`, `created_at`)
SELECT 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'role-0001-0000-0000-000000000001', `id`, NOW(6)
FROM `permissions`
WHERE `permission_key` IN (
  'projects.view', 'projects.update', 'activities.view', 'activities.create',
  'activities.update', 'submissions.create', 'submissions.view', 'dprs.create',
  'dprs.view', 'dprs.submit', 'reports.view', 'users.view'
);

-- Grant all permissions to TENANT_ADMIN role
INSERT IGNORE INTO `role_permissions` (`tenant_id`, `role_id`, `permission_id`, `created_at`)
SELECT 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'role-0001-0000-0000-000000000002', `id`, NOW(6)
FROM `permissions`;

-- Grant all permissions to ADMIN role
INSERT IGNORE INTO `role_permissions` (`tenant_id`, `role_id`, `permission_id`, `created_at`)
SELECT 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'role-0001-0000-0000-000000000003', `id`, NOW(6)
FROM `permissions`;

-- -----------------------------------------------------------------------------
-- 5. Default Users
-- -----------------------------------------------------------------------------
-- Primary Admin / Field Lead: Mani Bhaba
-- Email: mani.bhaba@yecindia.com | Username: mani.bhaba | Password: 1234root
-- Secondary Email Alias: mani@yecindia.com | Username: mani | Password: 1234root
-- Platform Superadmin: superuser@vyhir.com | Username: superuser | Password: Password123!
--
-- Argon2id Hashes:
-- 1234root:      $argon2id$v=19$m=65536,t=3,p=4$QWuOP7UmRqUWf7YWZ8fzaQ$Bm4Vu0qa4VD0w/cD8L9AugigRK5ep9pmsBbwTfUw0hQ
-- Password123!:  $argon2id$v=19$m=65536,t=3,p=4$uwiLK7j4q2gR2ahsEhq0Qg$dOXW2Znr9fDUdFscPtP1kFI6Pp+0MZS3myfkG6d1bQo
INSERT IGNORE INTO `users` (`id`, `full_name`, `username`, `email`, `phone`, `emergency_phone`, `avatar_url`, `password_hash`, `status`, `is_platform_admin`, `created_at`, `updated_at`) VALUES
('user-0001-0000-0000-000000000001', 'Mani Bhaba', 'mani.bhaba', 'mani.bhaba@yecindia.com', '+91 98450 12345', '+91 98450 67890', NULL, '$argon2id$v=19$m=65536,t=3,p=4$QWuOP7UmRqUWf7YWZ8fzaQ$Bm4Vu0qa4VD0w/cD8L9AugigRK5ep9pmsBbwTfUw0hQ', 'ACTIVE', 0, NOW(6), NOW(6)),
('user-0001-0000-0000-000000000002', 'Mani Bhaba', 'mani', 'mani@yecindia.com', '+91 98450 12345', '+91 98450 67890', NULL, '$argon2id$v=19$m=65536,t=3,p=4$QWuOP7UmRqUWf7YWZ8fzaQ$Bm4Vu0qa4VD0w/cD8L9AugigRK5ep9pmsBbwTfUw0hQ', 'ACTIVE', 0, NOW(6), NOW(6)),
('user-0001-0000-0000-000000000000', 'Platform Superadmin', 'superuser', 'superuser@vyhir.com', '+91 99999 99999', '+91 99999 99999', NULL, '$argon2id$v=19$m=65536,t=3,p=4$uwiLK7j4q2gR2ahsEhq0Qg$dOXW2Znr9fDUdFscPtP1kFI6Pp+0MZS3myfkG6d1bQo', 'ACTIVE', 1, NOW(6), NOW(6));

-- -----------------------------------------------------------------------------
-- 6. Tenant Memberships
-- -----------------------------------------------------------------------------
INSERT IGNORE INTO `tenant_memberships` (`id`, `tenant_id`, `user_id`, `membership_status`, `joined_at`, `created_at`, `updated_at`) VALUES
('memb-0001-0000-0000-000000000001', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'user-0001-0000-0000-000000000001', 'ACTIVE', NOW(6), NOW(6), NOW(6)),
('memb-0001-0000-0000-000000000002', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'user-0001-0000-0000-000000000002', 'ACTIVE', NOW(6), NOW(6), NOW(6));

-- -----------------------------------------------------------------------------
-- 7. Membership Roles Link
-- -----------------------------------------------------------------------------
INSERT IGNORE INTO `membership_roles` (`tenant_id`, `tenant_membership_id`, `role_id`, `assigned_at`) VALUES
('c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'memb-0001-0000-0000-000000000001', 'role-0001-0000-0000-000000000001', NOW(6)),
('c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'memb-0001-0000-0000-000000000001', 'role-0001-0000-0000-000000000002', NOW(6)),
('c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'memb-0001-0000-0000-000000000002', 'role-0001-0000-0000-000000000001', NOW(6)),
('c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'memb-0001-0000-0000-000000000002', 'role-0001-0000-0000-000000000002', NOW(6));

-- -----------------------------------------------------------------------------
-- 8. Construction Projects (from seed_mani_bhaba.js)
-- -----------------------------------------------------------------------------
INSERT IGNORE INTO `projects` (`id`, `tenant_id`, `project_code`, `name`, `description`, `client_name`, `site_address`, `status`, `budget`, `created_at`, `updated_at`) VALUES
('proj-0001-0000-0000-000000000001', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'PRJ-EXP-07', 'Delhi-Mumbai Expressway (Ch. 120-160)', 'Construction of 8-lane greenfield highway package with bridges and underpasses', 'National Highways Authority of India (NHAI)', 'Sector 14, Expressway Corridor, Vadodara Zone', 'ACTIVE', 450000000.00, NOW(6), NOW(6)),
('proj-0001-0000-0000-000000000002', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'PRJ-BRG-12', 'Ganga Elevated Flyover & Cable Stay Bridge', '6-lane elevated viaduct and river bridge superstructure construction', 'State Highway & Bridge Development Corp', 'Riverbank West Section, Varanasi Corridor', 'ACTIVE', 280000000.00, NOW(6), NOW(6));

-- -----------------------------------------------------------------------------
-- 9. Project Activities / WBS (from seed_mani_bhaba.js)
-- -----------------------------------------------------------------------------
INSERT IGNORE INTO `activities` (`id`, `tenant_id`, `project_id`, `activity_code`, `name`, `description`, `status`, `priority`, `progress`, `created_at`, `updated_at`) VALUES
-- Activities for PRJ-EXP-07
('acti-0001-0000-0000-000000000001', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'proj-0001-0000-0000-000000000001', 'ACT-EMB-01', 'Embankment Construction & Compaction', 'Soil filling and heavy vibratory compaction', 'IN_PROGRESS', 'HIGH', 25, NOW(6), NOW(6)),
('acti-0001-0000-0000-000000000002', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'proj-0001-0000-0000-000000000001', 'ACT-GSB-02', 'Granular Sub-Base (GSB) Laying', 'Graded crushed stone layer spreading and rolling', 'NOT_STARTED', 'HIGH', 0, NOW(6), NOW(6)),
('acti-0001-0000-0000-000000000003', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'proj-0001-0000-0000-000000000001', 'ACT-DBM-03', 'Dense Bituminous Macadam (DBM) Paving', 'Hot mix asphalt layer laying with sensor paver', 'NOT_STARTED', 'HIGH', 0, NOW(6), NOW(6)),
('acti-0001-0000-0000-000000000004', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'proj-0001-0000-0000-000000000001', 'ACT-DRN-04', 'Box Culvert & Drainage Installation', 'Precast RCC box culvert placement and joint sealing', 'IN_PROGRESS', 'HIGH', 25, NOW(6), NOW(6)),
-- Activities for PRJ-BRG-12
('acti-0001-0000-0000-000000000005', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'proj-0001-0000-0000-000000000002', 'ACT-PIL-01', 'Bored Cast-in-situ Piling (1200mm Dia)', 'Hydraulic rotary drilling and tremie concreting', 'IN_PROGRESS', 'HIGH', 25, NOW(6), NOW(6)),
('acti-0001-0000-0000-000000000006', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'proj-0001-0000-0000-000000000002', 'ACT-PCP-02', 'Pier Cap Concreting & Bar Bending', 'High-grade M45 concrete pouring for pier heads', 'NOT_STARTED', 'HIGH', 0, NOW(6), NOW(6)),
('acti-0001-0000-0000-000000000007', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'proj-0001-0000-0000-000000000002', 'ACT-SGR-03', 'Precast Segment Launching', 'Gantry girder segment erection and epoxy jointing', 'NOT_STARTED', 'HIGH', 0, NOW(6), NOW(6)),
('acti-0001-0000-0000-000000000008', 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', 'proj-0001-0000-0000-000000000002', 'ACT-CSB-04', 'Stay Cable Post-Tensioning & Stressing', 'High-tensile strand stressing with mono-jacks', 'NOT_STARTED', 'HIGH', 0, NOW(6), NOW(6));

-- -----------------------------------------------------------------------------
-- 10. Activity Assignments to Mani Bhaba's Memberships
-- -----------------------------------------------------------------------------
INSERT IGNORE INTO `activity_assignments` (`tenant_id`, `activity_id`, `tenant_membership_id`, `assigned_at`)
SELECT 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', `id`, 'memb-0001-0000-0000-000000000001', NOW(6)
FROM `activities`
WHERE `tenant_id` = 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f';

INSERT IGNORE INTO `activity_assignments` (`tenant_id`, `activity_id`, `tenant_membership_id`, `assigned_at`)
SELECT 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f', `id`, 'memb-0001-0000-0000-000000000002', NOW(6)
FROM `activities`
WHERE `tenant_id` = 'c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f';

SET FOREIGN_KEY_CHECKS = 1;

-- Seeded passwords are public (documented above): force a change at first login.
UPDATE `users` SET `must_change_password` = true
WHERE `username` IN ('mani.bhaba', 'mani', 'superuser');
