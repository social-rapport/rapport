var dbQ = require('../db-refactor/dbQueries.js');
var dbM = require('./dbModel.js');



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

var contacts = [
    {
     email: 'a@b',
     name: 'John',
     photo: 'xyz',
    }
];

describe('user queries',function(){

var userObj = {name: 'Fakey McFake', gmail:'fake@fake.com' , gmailAuthToken:'authToken'};

// dbModel.deleteUser(4)
  // .then(log);

  // dbModel.updateUser(5, 'Fakey McFakesalot', 'fake@fake.com', 'authToken')
  // .then(log);

});

describe('contact queries',function(){

//new contacts
contactA1 = {
  contactId: null,
  email: 'a',
  name: 'a',
  photo: 'a',
  birthday: 'a',
};

contactB1 = {
  contactId: null,
  email: 'b',
  name: 'b',
  photo: 'b',
  birthday: 'b',
};

//already saved and updated
contactA2 = {
  contactId: 1,
  email: 'aa',
  name: 'aa',
  photo: 'aa',
  birthday: 'aa',
};

contactB2 = {
  contactId: 2,
  email: 'bb',
  name: 'bb',
  photo: 'bb',
  birthday: 'bb',
};

//unit method tests
//dbQ.removeSelectedContact({contactId: 1}).then(log);
//dbQ.addToSelectedContacts(7,'aa','bb','1111111')
// .then(log);
//dbQ.updateSelectedContact(contact2).then(log);

// dbM.addOrUpdateSelectedContacts(1,[contactA1, contactB1])
// .then((arr)=>{
//   console.log(arr);
// })


});

describe('task queries',function(){

//<----- task type
var taskA1 = { 
  taskId: null,
  date: 'a', 
  platform: 'a', 
  message: 'a', 
  task: 'a'
};

var taskA2 = { 
  taskId: 1,
  date: 'aa', 
  platform: 'aa', 
  message: 'aa', 
  task: 'aa'
};

//saved versions
var taskB1 = { 
  taskId: null,
  date: 'b', 
  platform: 'b', 
  message: 'b', 
  task: 'b'
};

var taskB2 = { 
  taskId: 2,
  date: 'bb', 
  platform: 'bb', 
  message: 'bb', 
  task: 'bb'
};

// dbM.addOrUpdateSelectedContacts(1,[contactA1, contactB1])
// .then((arr)=>{
//   console.log(arr);
// })

// dbM.addOrUpdateRegisteredTasks(1,[taskA1, taskB1])
// .then((arr)=>{
//   console.log(arr);
// })

//dbQ.removeSelectedTask(task2).then(log);
//dbQ.addToTasks(botId, task1).then(log);
//dbQ.updateSelectedTask(task2).then(log);
//dbModel.getSelectedTasks(2).then(log);


});


describe('bot queries',function(){

var botA1 = {
    "botId": null,
    "botType":'a',
    "botName": 'myBot',
    "tasks":tasks,
    "selectedContacts":contacts,
    botActivity:{
        "recent":[],
        "scheduled":[]
    }
  };

  var botA2 = {
    "botId": null,
    "botType":'aa',
    "botName": 'myBot',
    "tasks":tasks,
    "selectedContacts":contacts,
    botActivity:{
        "recent":[],
        "scheduled":[]
    }
  };


    //dbQ.addBotToUser(1, botA1).then(log);

    //per user methods
    //dbQ.getBot(11).then(log);

  // dbM.getAllBotInfo(11).then((data)=>{
  //   1+1;
  // });

// dbM.getAllBotInfo(11).then((data)=>{
//   1+1;
// });

    // dbM.getAllUserBots(1).then(log);

});