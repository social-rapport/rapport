var mysql = require('promise-mysql');
var connection;

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dev',
    database: 'rapport'
}).then(function(conn,x){
    connection = conn;
}).catch(function(err){
    console.log(err);
});

module.exports = new Promise(function(resolve, reject){
    while(!connection){
        1+1; 
    }
    resolve(connection);
});