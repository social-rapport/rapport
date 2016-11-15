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
      tasks.forEach(function(contact){
        var msgData = {
          name: tasks[0].recipient,
          email: tasks[0].recipient,
          subject: "whooooot! this is from Nam",
          body: 'Hello there! How have you been?<br/>'
        }
        gmail.sendMailBot(msgData, function(results){
          console.log('results',results);
        });
      });

      // gmail.sendMailBot(function(results){
      //   console.log('results',results);
      // });
    });
  }
}




