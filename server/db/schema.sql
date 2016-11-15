CREATE DATABASE rapport;

USE rapport;


DROP TABLE IF EXISTS `Tasks`;

CREATE TABLE `Tasks` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `recipient` VARCHAR(20) ,
  `date` DATE ,
  `platform` VARCHAR(20) ,
  `id_bot` INTEGER ,
  `message` VARCHAR(500) ,
  `task` VARCHAR(20) ,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(20),
  `id_gmail` INTEGER,
  `id_facebook` INTEGER,
  `authId` INTEGER,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `bot`;

CREATE TABLE `bot` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `botName` VARCHAR(20),
  `id_users` INTEGER,
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
  `recipient` CHAR,
  `date` DATE,
  `platform` CHAR,
  `message` CHAR,
  `task` CHAR,
  `id_bot` INTEGER,
  PRIMARY KEY (`id`)
) COMMENT ' identical to task';


ALTER TABLE `Tasks` ADD FOREIGN KEY (id_bot) REFERENCES `bot` (`id`);
ALTER TABLE `users` ADD FOREIGN KEY (id_gmail) REFERENCES `gmail` (`id`);
ALTER TABLE `users` ADD FOREIGN KEY (id_facebook) REFERENCES `facebook` (`id`);
ALTER TABLE `bot` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `Log` ADD FOREIGN KEY (id_bot) REFERENCES `bot` (`id`);

