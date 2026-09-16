CREATE TABLE `site_content` (
	`id` integer PRIMARY KEY NOT NULL,
	`draft` text NOT NULL,
	`published` text NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`published_at` text
);
