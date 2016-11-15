var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cichlid1022',
  database: 'rapport'
});

connection.connect();
module.exports = connection;

