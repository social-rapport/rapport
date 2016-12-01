var dbModel = require('../db/dbModel.js');
var gmail = require('../config/gmailController.js');
const dbQ = require('../db-refactor/dbQueries.js');
var express = require('express');
var app = express();
const botMethods = require('./botMethods.js');

const runAllTasks = function(callback) {
  const today = `${new Date().getMonth()}\/${new Date().getDate()}`;
  dbQ.getTasksJoinedWithUsers(today)
  .then(tasks => Promise.all(tasks.map(taskObj => botMethods[taskObj.task](taskObj))))
  .then(logTasks)
  .then(callback);
};

const logTasks = tasksArray => Promise.all(tasksArray.map(task => dbQ.addToLog(task)));

module.exports.runAllTasks = runAllTasks;
module.exports.logTasks = logTasks;



// module.exports = {
// //<----may go, using old oauth
//   runTasks: function(){
//     dbModel.bot.getAllTasks(function(err, tasks){
//        if(err){ throw err;}
//       console.log('tasks', tasks);
//       console.log('email', tasks[0].recipient);

//       function runGenerator(length, index) {
//         if(length === index) {
//           return;
//         }
//         console.log(index)
//         var msgData = {
//           name: tasks[index].recipient,
//           email: tasks[index].recipient,
//           subject: "whooooot! this is from Nam",
//           body: 'Hello there! How have you been?<br/>'
//         }
//         // gmail.sendMailBot(msgData, function(results){
//         //   console.log('results',results);
//         //   runGenerator(length, index+1);
//         // });
//       }
//       runGenerator(tasks.length, 0);
//     });
//   },
//   //tasks in a database -> preps to send to gmail(using oauth) -> send emails ->log to database all completed tasks
//   runAllTasks: function(callback){

//     dbQ.getTasksJoinedWithUsers('today')
//       .then(tasks => Promise.all(tasks.map(taskObj => botMethods[taskObj.task](taskObj))))
//       .then(module.exports.logTasks)
//       .then(callback);


//     // console.log('runAllTasks running');
//     // dbModel.tasks.getTasksForChronJob(function(tasks){
//     //   console.log('tasks', tasks);
//     //   console.log('email', tasks[0].recipient.name);
//     //   var completedTasks = [];

//     //   function runGenerator(length, index) {
//     //     if(length === index) {
//     //       module.exports.logTasks(completedTasks);
//     //       callback('Hey I\'m done');
//     //       return;
//     //     }
//     //     console.log(index);
//     //     // Run Gmail Tasks
//     //     if(tasks[index].tasks.platform === 'gmail'){
//     //       console.log('platform', tasks[index].tasks.platform);
//     //       var msgData = {
//     //         username: tasks[index].user.userName,
//     //         useremail: tasks[index].user.userEmail,
//     //         emailTo: tasks[index].recipient.email,
//     //         subject: "whooooot! this is from Nam",
//     //         body: 'Hello there! How have you been?<br/>'
//     //       }
//     //       gmail.sendMailBot(msgData, tasks[index].user.oauth, function(results){
//     //         console.log('results',results);
//     //         completedTasks.push(tasks[index].tasks);
//     //         runGenerator(length, index+1);

//     //       });
//     //     } else if(tasks[index].tasks.platform === 'facebook'){
//     //       //Run FaceBook Tasks
//     //       var msgData = {
//             //   body: 'Hello there! How have you been?<br/>'
//             // }
//             // fb.sendMsg(tasks[index].facebook.auth, tasks[index].facebook.userTo, msgData, function(results){
//             //   console.log('results',results);
//             //   completedTasks.push(tasks[index].tasks);
//             //   runGenerator(length, index+1);
//             // });
//     //     }
//     //   }
//     //   runGenerator(tasks.length, 0);
//     // });

//   },
//   logTasks: function(tasksArray){
//     return Promise.all(tasksArray.map(task => dbQ.addToLog(task)));

//   //   var runGenerator = function(length, index){
//   //     if(length === index){
//   //       return;
//   //     } else{
//   //       dbModel.log.saveTasks(tasks[index], function(status){
//   //         console.log('status');
//   //         runGenerator(length, index+1)
//   //       });
//   //     }
//   //   }
//   //   runGenerator(tasks.length, 0);
//   // }
//   }
// }

// // // unit test runAllTasks
// // module.exports.runAllTasks();

// // unit test logTasks
// // var tasks = [{
// //     date: '2016-11-15',
// //     platform: 'gmail',
// //     message: null,
// //     task: 'sayHiGmail',
// //     id_bot: 1,
// //     id_recipient: 1
// // },
// // {
// //     date: '2016-11-15',
// //     platform: 'gmail',
// //     message: null,
// //     task: 'sayHiGmail',
// //     id_bot: 2,
// //     id_recipient: 2,
// // }];

// // module.exports.logTasks(tasks, function(result){
// //   console.log(result);
// // });


console.log("module exported", module.exports);