var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hrr',
  database: 'rapport'
});

connection.connect();
module.exports = connection;

