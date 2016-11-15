CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */
/* single schema */
CREATE TABLE chatData(P_Id int NOT NULL AUTO_INCREMENT, username VARCHAR(20), text VARCHAR(30), roomname VARCHAR(20), PRIMARY KEY(P_Id));
INSERT INTO chatData(P_Id, username, text, roomname) VALUES (1, 'Bob', 'Hello, World', 'lobby');

/* mutli schema
CREATE TABLE users(U_Id int NOT NULL, username VARCHAR(20), PRIMARY KEY(U_Id));

CREATE TABLE lobby(L_Id int NOT NULL, roomname VARCHAR(20), PRIMARY KEY(L_Id));

CREATE TABLE messages(
  M_Id int NOT NULL,
  U_Id int,
  L_Id int,
  message TEXT(30),
  PRIMARY KEY(M_Id),
  FOREIGN KEY (U_Id) REFERENCES users (U_Id),
  FOREIGN KEY (L_Id) REFERENCES lobby (L_Id)
  );
*/



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

/*
CREATE TABLE messages (
  /* Describe your table here.*/
  /* We have 3 tables: users, messages, lobby. Messages have foreign keys from users
  and lobby.

  */
  /*
);
*/