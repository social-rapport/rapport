var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DBPASS || require('../../private_keys.js').DB_PASS,
  database: 'rapport'
});

connection.connect();
module.exports = connection;

