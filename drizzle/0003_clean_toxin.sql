PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_service_messages` (
	`id` integer PRIMARY KEY NOT NULL,
	`registration_id` integer NOT NULL,
	`notification_token` text NOT NULL,
	`remaining_count` integer NOT NULL,
	`session_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`updated_at` integer DEFAULT (unixepoch() * 1000),
	FOREIGN KEY (`registration_id`) REFERENCES `registrations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_service_messages`("id", "registration_id", "notification_token", "remaining_count", "session_id", "expires_at", "created_at", "updated_at") SELECT "id", "registration_id", "notification_token", "remaining_count", "session_id", "expires_at", "created_at", "updated_at" FROM `service_messages`;--> statement-breakpoint
DROP TABLE `service_messages`;--> statement-breakpoint
ALTER TABLE `__new_service_messages` RENAME TO `service_messages`;--> statement-breakpoint
PRAGMA foreign_keys=ON;