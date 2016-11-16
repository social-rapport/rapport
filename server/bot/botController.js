var dbModel = require('../db/dbModel.js');
var gmail = require('../config/gmailController.js');
var express = require('express');
var app = express();


module.exports = {

  runTasks: function(){
    dbModel.bot.getAllTasks(function(err, tasks){
       if(err){ throw err;}
      console.log('tasks', tasks);
      console.log('email', tasks[0].recipient);

      function runGenerator(length, index) {
        if(length === index) {
          return;
        }
        console.log(index)
        var msgData = {
          name: tasks[index].recipient,
          email: tasks[index].recipient,
          subject: "whooooot! this is from Nam",
          body: 'Hello there! How have you been?<br/>'
        }
        gmail.sendMailBot(msgData, function(results){
          console.log('results',results);
          runGenerator(length, index+1);
        });
      }
      runGenerator(tasks.length, 0);
    });
  },
  runAllTasks: function(){
    dbModel.tasks.getAllTasks(function(tasks){
       if(err){ throw err;}
      console.log('tasks', tasks);
      console.log('email', tasks[0].recipient.name);
      var completedTasks = [];

      function runGenerator(length, index) {
        if(length === index) {
          return;
        }
        console.log(index);
        // Run Gmail Tasks
        if(tasks[index].tasks.platform === gmail){
          var msgData = {
            username: tasks[index].user.userName,
            useremail: tasks[index].user.userEmail,
            emailTo: tasks[index].recipient.email,
            subject: "whooooot! this is from Nam",
            body: 'Hello there! How have you been?<br/>'
          }
          gmail.sendMailBot(msgData, function(results){
            console.log('results',results);
            completedTasks.push(tasks[index].tasks);
            runGenerator(length, index+1);

          });
        } else if(tasks[index].tasks.platform === facebook){
          //Run FaceBook Tasks
          completedTasks.push(tasks[index].tasks);
        }
      }
      runGenerator(tasks.length, 0);
      logTasks(completedTasks);
    });
  },
  logTasks: function(tasks){
    dbModel.log.saveTasks(tasks, function(status){
      console.log('status');
    });
  }
}




