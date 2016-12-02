-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'bot'
--
-- ---
DROP DATABASE IF EXISTS test;
CREATE DATABASE test;
USE test;

DROP TABLE IF EXISTS `bot`;

CREATE TABLE `bot` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `botName` VARCHAR(100),
  `botType` VARCHAR(100),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'tasks'
--
-- ---

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(100),
  `platform` VARCHAR(100),
  `message` VARCHAR(500),
  `task` VARCHAR(100),
  `interval` INTEGER,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'log'
--
-- ---

DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(100),
  `platform` VARCHAR(100),
  `message` VARCHAR(500),
  `task` VARCHAR(100),
  `contactName` VARCHAR(100),
  `id_bot` INTEGER,
  `id_user` INTEGER,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'tasks_bots'
--
-- ---

DROP TABLE IF EXISTS `tasks_bots`;

CREATE TABLE `tasks_bots` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_bot` INTEGER,
  `id_task` INTEGER,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users_bots'
--
-- ---

DROP TABLE IF EXISTS `users_bots`;

CREATE TABLE `users_bots` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_user` INTEGER,
  `id_bot` INTEGER,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100),
  `gmail` VARCHAR(100),
  `gmailAuthToken` VARCHAR(500),
  `fbPassword` VARCHAR(100),
  `fbUsername` VARCHAR(100),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'selectedGmailContacts'
--
-- ---

DROP TABLE IF EXISTS `selectedGmailContacts`;

CREATE TABLE `selectedGmailContacts` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100),
  `email` VARCHAR(100),
  `birthday` VARCHAR(100),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'bot_contacts'
--
-- ---

DROP TABLE IF EXISTS `bot_contacts`;

CREATE TABLE `bot_contacts` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_bot` INTEGER,
  `id_contact` INTEGER,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'selectedFacebookFriends'
--
-- --

DROP TABLE IF EXISTS `selectedFacebookFriends`;

CREATE TABLE `selectedFacebookFriends` (
  `id` INTEGER NOt NULL AUTO_INCREMENT,
  `name` VARCHAR(100),
  `vanityName` VARCHAR(100),
  `birthday` VARCHAR(100),
  `id_bot` INTEGER,
  PRIMARY KEY (`id`)
);
-- ---
-- Foreign Keys
-- ---

ALTER TABLE `log` ADD FOREIGN KEY (id_bot) REFERENCES `bot` (`id`);
ALTER TABLE `log` ADD FOREIGN KEY (id_user) REFERENCES `users` (`id`);
ALTER TABLE `tasks_bots` ADD FOREIGN KEY (id_bot) REFERENCES `bot` (`id`);
ALTER TABLE `tasks_bots` ADD FOREIGN KEY (id_task) REFERENCES `tasks` (`id`);
ALTER TABLE `users_bots` ADD FOREIGN KEY (id_user) REFERENCES `users` (`id`);
ALTER TABLE `users_bots` ADD FOREIGN KEY (id_bot) REFERENCES `bot` (`id`);
ALTER TABLE `bot_contacts` ADD FOREIGN KEY (id_bot) REFERENCES `bot` (`id`);
ALTER TABLE `bot_contacts` ADD FOREIGN KEY (id_contact) REFERENCES `selectedGmailContacts` (`id`);
ALTER TABLE `selectedFacebookFriends` ADD FOREIGN KEY (id_bot) REFERENCES `bot` (`id`);
