//const auth0Utils = require('../utils/auth0_utils.js');
//var token = require('../../env.js').ADMIN_IDTOKEN;

var dbQ = require('../db-refactor/dbQueries.js');
var dbM = require('./dbModel.js');
var auth0 = require('../utils/auth0_utils');
var appController = require('../config/appController');
var db = require('./db');
var mysql = require('promise-mysql');
var connection;

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cichlid1022',
    database: 'rapport'
}).then(function(conn,x){
    dbQ.importConnection(conn);
    runTests(conn);
}).catch(function(err){
    console.log(err);
});

function log(data){
  console.log(data);
}
function runTests(){



}






