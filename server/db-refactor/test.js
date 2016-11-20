//const auth0Utils = require('../utils/auth0_utils.js');
//var token = require('../../env.js').ADMIN_IDTOKEN;
var dbQ = require('../db-refactor/dbQueries.js');
var dbM = require('./dbModel.js');

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

//  dbQ.addBotToUser(1, bot1.bots[0])
//   .then(log);


  //<---------require botId


// for(var i= 2; i<20; i++){
//   dbQ.deleteBot({botId: i});
//   dbQ.removeSelectedContact({contactId: i});
//   dbQ.removeSelectedTask({taskId: i});
// }
// .then(log);
//botId, name, email, birthday

//dbModel.updateBot(7, 'John').then(log);

//dbModel.addToTasks(2,'111','gmail','hi','task1').then(log);



//dbModel.getSelectedContacts(7).then(log);

//contactId->

 
  
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

dbM.addOrUpdateRegisteredTasks(1,[taskA1, taskB1])
.then((arr)=>{
  console.log(arr);
})

//dbQ.removeSelectedTask(task2).then(log);
//dbQ.addToTasks(botId, task1).then(log);
//dbQ.updateSelectedTask(task2).then(log);
//dbModel.getSelectedTasks(2).then(log);

// contact1.birthday = '2';
// dbM.addOrUpdateContact(2,contact1);
//dbM.addOrUpdateContact(2);





//<------ saved task type


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

