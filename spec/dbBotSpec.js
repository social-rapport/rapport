var env = require('../env.js');
require('./typey.js');
var dbModel = require('../server/db/dbModel.js');

var mysql = require('promise-mysql');
var connection;

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DBPASS || require('../env.js').DB_PASS,
    database: 'rapport'
}).then(function(conn,x){
    console.log(conn,x);
    connection = conn;
});
console.log('conneciton is',connection)
var chai = require('chai');
var expect = chai.expect;

//<-------------------QUERY DEFINITIONS------------------->

var getUsers = function(){ return connection.query('select * from users')};
var getBots = function(){ return connection.query('select * from bot');}
var getTasks = function(){ return connection.query('select * from bot');};
var deleteBots = function(){ return connection.query('delete from bot')};
var deleteTasks = function(){ return connection.query('delete * from Tasks')};
var deleteUsers = function(){ return connection.query('delete from users')};
var deleteGmail = function(){ return connection.query('delete from gmail')};

//<-------------------BEFORE-EACH------------------->

// beforeEach(function(done){
    //  deleteBots()
    // .then(function(a,b){
    //     console.log(a,b);
    // })
    // .then(done)
    // .catch(function(err){
    //     console.log(err);
    //     done();
    // });
// })

//<-------------------dbModel Methods: Bots------------------->
//todo: server responds with 200

describe ('db botModel.add',function(){
  it.only('returns the list of bots',function(done){
    deleteGmail()
    .then(function(a,b){
        console.log(a,b);
    })
    .then(done)
    .catch(done)
  });
});

describe ('db botModel',function(){
  xit('returns the list of bots',function(done){
    dbModel.tasks.updateTasksFlow()
    .then(function(a,b){
        console.log(a,b);
    })
    .then(done)
    .catch(function(err){
        console.log(err);
        done();
    });
  });
});

