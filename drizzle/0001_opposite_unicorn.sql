PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_registrations` (
	`id` integer PRIMARY KEY NOT NULL,
	`line_user_id` text(33) NOT NULL,
	`first_name` text(255) NOT NULL,
	`last_name` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`phone` text(15) NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`updated_at` integer DEFAULT (unixepoch() * 1000)
);
--> statement-breakpoint
INSERT INTO `__new_registrations`("id", "line_user_id", "first_name", "last_name", "email", "phone", "created_at", "updated_at") SELECT "id", "line_user_id", "first_name", "last_name", "email", "phone", "created_at", "updated_at" FROM `registrations`;--> statement-breakpoint
DROP TABLE `registrations`;--> statement-breakpoint
ALTER TABLE `__new_registrations` RENAME TO `registrations`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_service_messages` (
	`id` integer PRIMARY KEY NOT NULL,
	`registration_id` integer NOT NULL,
	`notification_token` integer NOT NULL,
	`remaining_count` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`updated_at` integer DEFAULT (unixepoch() * 1000),
	FOREIGN KEY (`registration_id`) REFERENCES `registrations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_service_messages`("id", "registration_id", "notification_token", "remaining_count", "expires_at", "created_at", "updated_at") SELECT "id", "registration_id", "notification_token", "remaining_count", "expires_at", "created_at", "updated_at" FROM `service_messages`;--> statement-breakpoint
DROP TABLE `service_messages`;--> statement-breakpoint
ALTER TABLE `__new_service_messages` RENAME TO `service_messages`;