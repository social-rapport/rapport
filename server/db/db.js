var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1',
  database: 'rapport'
});

connection.connect();
module.exports = connection;

