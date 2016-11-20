//const auth0Utils = require('../utils/auth0_utils.js');
//var token = require('../../env.js').ADMIN_IDTOKEN;
var dbModel = require('../db-refactor/dbModel.js');
var db = require('./db');

var contacts = [
    {
     email: 'a@b',
     name: 'John',
     photo: 'xyz',
    }
];

var bot1 = {
            "bots":[{
            "botType":'basic',
            "botName": 'myBot',
            "tasks":[
                'sayHappyBirthdayGmail',
                'sayHappyBirthdayFacebook',
                'sayHiGmail',
                'sayHiFacebook'
            ],
            "selectedContacts":contacts,
            botActivity:{
                "recent":[],
                "scheduled":[]
            }
            }]
        };
var mysql = require('promise-mysql');

var connection;

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dev',
    database: 'rapport'
}).then(function(conn,x){
    dbModel.importConnection(conn);
    runTests(conn);
}).catch(function(err){
    console.log(err);
});


function runTests(){
  dbModel.addBotToUser(bot1.bots[0],1,function(res){
    console.log(res);
  });
}



//it should remove a single bot

//-----------------ASSOCIATED DATA-----------------//

//adding a bot adds the associated tasks

//removing a bot removes the associated tasks

//adding a bot adds associated contacts

//removing a bot removes associated contacts

//-----------------ASSOCIATED DATA-----------------//

//it adds multiple bots that do not exist yet for a user

