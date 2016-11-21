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

  botTest();
  //testOldUser();

//<-------------------------------- QUERY TESTS 

   
  // .then(log);




// for(var i= 0; i<20; i++){
//   dbQ.deleteBot({botId: i});
//   dbQ.removeSelectedContact({contactId: i});
//   dbQ.removeSelectedTask({taskId: i});
// }

//<---------require userId

  // dbModel.deleteUser(4)
  // .then(log);

  // dbModel.updateUser(5, 'Fakey McFakesalot', 'fake@fake.com', 'authToken')
  // .then(log);



function botTest(){

  // for(var i= 0; i<20; i++){
  //   dbQ.deleteBot({botId: i});
  //   dbQ.removeSelectedContact({contactId: i});
  //   dbQ.removeSelectedTask({taskId: i});
  // }

  var contacts = [
    {
        id: null,
        email: 'aa',
        name: 'aa',
        photo: 'aa',
        birthday: 'aa'
    },
    {
        id: null,
        email: 'bb',
        name: 'bb',
        photo: 'bb',
        birthday: 'bb'
    },
    {
        id: null,
        email: 'cc',
        name: 'cc',
        photo: 'cc',
        birthday: 'cc'
    },
    {
        id: null,
        email: 'dd',
        name: 'dd',
        photo: 'dd',
        birthday: 'dd'
    }
    
];

var tasks = [
    { 
        id: null,
        date: 'aa', 
        platform: 'aa', 
        message: 'aa', 
        task: 'aa'
    },
        { 
        id: null,
        date: 'bb', 
        platform: 'bb', 
        message: 'bb', 
        task: 'bb'
    },
    { 
        id: null,
        date: 'cc', 
        platform: 'cc', 
        message: 'cc', 
        task: 'cc'
    }
];

  var botA1 = {
    "id": null,
    "botType":'a',
    "botName": 'myBot',
    "tasks":tasks,
    "selectedContacts": contacts,
    botActivity:{
        "recent":[],
        "scheduled":[]
    }
  };

  var botA2 = {
    "id": null,
    "botType":'aa',
    "botName": 'myBot',
    "tasks":tasks,
    "selectedContacts": contacts,
    botActivity:{
        "recent":[],
        "scheduled":[]
    }
  };

//unit methods
//dbQ.addBotToUser(1, botA1).then(log);

//per user methods
//dbQ.getBot(11).then(log);

  // dbM.getAllBotInfo(11).then((data)=>{
  //   1+1;
  // });

// dbM.getAllBotInfo(11).then((data)=>{
//   1+1;
// });

var userObj = {name: 'Fakey McFake', gmail:'fake@fake.com' , gmailAuthToken:'authToken'};

    // dbQ.addUser(userObj)
    //     .then((userId) => dbM.updateOrCreateNewBot(userId,botA2))
    //     .then(() => dbM.getAllBotInfo(1).then(log));

    dbQ.addUser(userObj)
        .then(userId => dbM.updateOrCreateUserBots(userId, [botA1, botA2]))
        .then(() => dbM.getAllUserBots(1)).then(log);


    // dbQ.getSelectedContacts(1).then(log);
    // dbQ.getSelectedTasks(1).then(log);
    // dbM.getAllBotInfo(1).then(log);
    // dbM.getAllBotInfo(2).then(log);
    // dbM.getAllUserBots(1).then(log);



}



//  dbQ.addBotToUser(1, bot1.bots[0])
//   .then(log);

    

  //<---------require botId



// .then(log);
//botId, name, email, birthday

//dbModel.updateBot(7, 'John').then(log);

//dbModel.addToTasks(2,'111','gmail','hi','task1').then(log);



//dbModel.getSelectedContacts(7).then(log);

//contactId->

 
  
//new contacts
contactA1 = {
  id: null,
  email: 'a',
  name: 'a',
  photo: 'a',
  birthday: 'a',
};

contactB1 = {
  id: null,
  email: 'b',
  name: 'b',
  photo: 'b',
  birthday: 'b',
};

//already saved and updated
contactA2 = {
  id: 1,
  email: 'aa',
  name: 'aa',
  photo: 'aa',
  birthday: 'aa',
};

contactB2 = {
  id: 2,
  email: 'bb',
  name: 'bb',
  photo: 'bb',
  birthday: 'bb',
};


//<--------------------------------collection method tests-------------------------------->

// dbM.addOrUpdateSelectedContacts(1,[contactA1, contactB1])
// .then((arr)=>{
//   console.log(arr);
// })

//unit method tests
//dbQ.removeSelectedContact({contactId: 1}).then(log);
//dbQ.addToSelectedContacts(7,'aa','bb','1111111')
// .then(log);
//dbQ.updateSelectedContact(contact2).then(log);

//<----- task type
var taskA1 = { 
  id: null,
  date: 'a', 
  platform: 'a', 
  message: 'a', 
  task: 'a'
};

var taskA2 = { 
  id: 1,
  date: 'aa', 
  platform: 'aa', 
  message: 'aa', 
  task: 'aa'
};

//saved versions
var taskB1 = { 
  id: null,
  date: 'b', 
  platform: 'b', 
  message: 'b', 
  task: 'b'
};

var taskB2 = { 
  id: 2,
  date: 'bb', 
  platform: 'bb', 
  message: 'bb', 
  task: 'bb'
};

// dbM.addOrUpdateRegisteredTasks(1,[taskA1, taskB1])
// .then((arr)=>{
//   console.log(arr);
// })

//dbQ.removeSelectedTask(task2).then(log);
//dbQ.addToTasks(botId, task1).then(log);
//dbQ.updateSelectedTask(task2).then(log);
//dbModel.getSelectedTasks(2).then(log);

// contact1.birthday = '2';
// dbM.addOrUpdateContact(2,contact1);
//dbM.addOrUpdateContact(2);





//<------ saved task type


  //<-------------------------------- MODEL TESTS 



// }

// function testNewUser(){
//   var token = require('../../env').ADMIN_IDTOKEN;
//   var req = {body: {}, query: {token: token}};
//   var res = {};
//   auth0.authenticateFromToken(req, res, function(req, res, data){
//     appController.updateUserInfo(req, res, data);
//   });
// }

// function testOldUser(){
  
//   var token = require('../../env').ADMIN_IDTOKEN;
//   var req = {body: {}, query: {token: token, userId: 6}};
//   var res = {};
//   auth0.authenticateFromToken(req, res, function(req, res, data){
//     appController.updateUserInfo(req, res, data);
//   });
// }


}


//it should remove a single bot

//-----------------ASSOCIATED DATA-----------------//

//adding a bot adds the associated tasks

//removing a bot removes the associated tasks

//adding a bot adds associated contacts

//removing a bot removes associated contacts

//-----------------ASSOCIATED DATA-----------------//

//it adds multiple bots that do not exist yet for a user

