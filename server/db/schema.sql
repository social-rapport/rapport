CREATE DATABASE rapport;

USE rapport;


DROP TABLE IF EXISTS `Tasks`;

CREATE TABLE `Tasks` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_recipient` INTEGER ,
  `date` VARCHAR(100) ,
  `platform` VARCHAR(100) ,
  `id_bot` INTEGER ,
  `message` VARCHAR(500) ,
  `task` VARCHAR(100) ,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `tasks_recipients`;

CREATE TABLE `tasks_recipients`;
  `id` INTEGER NOT NULL AUT0_INCREMENT,
  `id_recipient` INTEGER

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(100),
  `id_gmail` INTEGER,
  `id_facebook` INTEGER,
  `authId` INTEGER,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `bot`;

CREATE TABLE `bot` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `botName` VARCHAR(100),
  `id_users` INTEGER,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `users_bots`;

CREATE TABLE `users_bots`(
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_user` INTEGER,
  `id_bot` INTEGER,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `gmail`;

CREATE TABLE `gmail` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `credentials` VARCHAR(500),
  `emailAddress` VARCHAR(500),
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `facebook`;

CREATE TABLE `facebook` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `credentials` VARCHAR(500),
  PRIMARY KEY (`id`)
);



DROP TABLE IF EXISTS `Log`;

CREATE TABLE `Log` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_recipient` INTEGER,
  `date` VARCHAR(100),
  `platform` VARCHAR(100),
  `message` VARCHAR(500),
  `task` VARCHAR(100),
  `id_bot` INTEGER,
  PRIMARY KEY (`id`)
) COMMENT ' identical to task';



DROP TABLE IF EXISTS `recipient`;

CREATE TABLE `recipient` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50),
  `email` VARCHAR(100),
  `birthday` VARCHAR(50),
  PRIMARY KEY (`id`)
);


ALTER TABLE `Tasks` ADD FOREIGN KEY (id_bot) REFERENCES `bot` (`id`);
ALTER TABLE `Tasks` ADD FOREIGN KEY (id_recipient) REFERENCES `recipient` (`id`);
ALTER TABLE `users` ADD FOREIGN KEY (id_gmail) REFERENCES `gmail` (`id`);
ALTER TABLE `users` ADD FOREIGN KEY (id_facebook) REFERENCES `facebook` (`id`);
ALTER TABLE `bot` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `Log` ADD FOREIGN KEY (id_bot) REFERENCES `bot` (`id`);
ALTER TABLE `Log` ADD FOREIGN KEY (id_recipient) REFERENCES `recipient` (`id`);
ALTER TABLE `users_bots` ADD FOREIGN KEY (id_user) REFERENCES `users` (`id`);
ALTER TABLE `users_bots` ADD FOREIGN KEY (id_bot) REFERENCES `bot` (`id`);
