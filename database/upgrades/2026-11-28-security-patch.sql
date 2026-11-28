-- Run ONCE on the existing production database (phpMyAdmin > SQL) BEFORE deploying
-- the security patch release. Safe to run on a DB created from the old mysql_schema.sql.

ALTER TABLE `users`
    ADD COLUMN `token_version` INTEGER NOT NULL DEFAULT 0 AFTER `is_platform_admin`,
    ADD COLUMN `must_change_password` BOOLEAN NOT NULL DEFAULT false AFTER `token_version`,
    ADD COLUMN `failed_login_count` INTEGER NOT NULL DEFAULT 0 AFTER `must_change_password`,
    ADD COLUMN `locked_until` DATETIME(6) NULL AFTER `failed_login_count`;

CREATE TABLE IF NOT EXISTS `password_reset_codes` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `code_hash` TEXT NOT NULL,
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `expires_at` DATETIME(6) NOT NULL,
    `used_at` DATETIME(6) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    INDEX `password_reset_codes_user_id_created_at_idx`(`user_id`, `created_at`),
    PRIMARY KEY (`id`),
    CONSTRAINT `password_reset_codes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seeded accounts have publicly known passwords: force a change at next login.
UPDATE `users` SET `must_change_password` = true
WHERE `username` IN ('mani.bhaba', 'mani', 'superuser');
