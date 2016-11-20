//const auth0Utils = require('../utils/auth0_utils.js');
//var token = require('../../env.js').ADMIN_IDTOKEN;
var dbQ = require('../db-refactor/dbQueries.js');
var dbModel = require('./dbModel.js');

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
    dbQ.importConnection(conn);
    runTests(conn);
}).catch(function(err){
    console.log(err);
});

function log(data){
  console.log(data);
}
function runTests(){

//<-------------------------------- QUERY TESTS 

  // dbModel.addUser('Fakey McFake', 'fake@fake.com', 'authToken')
  // .then(log);



//<---------require userId

  // dbModel.deleteUser(4)
  // .then(log);

  // dbModel.updateUser(5, 'Fakey McFakesalot', 'fake@fake.com', 'authToken')
  // .then(log);

 dbQ.addBotToUser(1, bot1.bots[0])
  .then(log);


  //<---------require botId


// dbModel.deleteBot(6)
// .then(log);
//botId, name, email, birthday

//dbModel.updateBot(7, 'John').then(log);

//dbModel.addToTasks(2,'111','gmail','hi','task1').then(log);

// dbModel.addToSelectedContacts(7,'aa','bb','1111111')
//  .then(log);

//dbModel.getSelectedContacts(7).then(log);

//contactId->

  //dbModel.removeSelectedContact(3).then(log);
  
  //dbModel.updateSelectedContact(2,'z','z','2222222').then(log);

//taskId -> 

  //dbModel.removeSelectedTask(1).then(log);

  //dbModel.updateSelectedTask(2,'222','gmail2','bye','task2').then(log);
  //dbModel.getSelectedTasks(2).then(log);

  //<-------------------------------- MODEL TESTS 




}






//it should remove a single bot

//-----------------ASSOCIATED DATA-----------------//

//adding a bot adds the associated tasks

//removing a bot removes the associated tasks

//adding a bot adds associated contacts

//removing a bot removes associated contacts

//-----------------ASSOCIATED DATA-----------------//

//it adds multiple bots that do not exist yet for a user

