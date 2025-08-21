CREATE TABLE `registrations` (
	`id` integer PRIMARY KEY NOT NULL,
	`line_user_id` text(33) NOT NULL,
	`first_name` text(255) NOT NULL,
	`last_name` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`phone` text(15) NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `service_messages` (
	`id` integer PRIMARY KEY NOT NULL,
	`registration_id` integer NOT NULL,
	`notification_token` integer NOT NULL,
	`remaining_count` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`registration_id`) REFERENCES `registrations`(`id`) ON UPDATE no action ON DELETE no action
);
