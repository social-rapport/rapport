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
    password: 'dev',
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
  testNewUser();
  function testNewUser(){
    var token = require('../../env').ADMIN_IDTOKEN;
    var req = {body: {}, query: {token: token}};
    var res = {};
    auth0.authenticateFromToken(req, res, function(req, res, data){
      appController.updateUserInfo(req, res, data);
    });
  }
}






