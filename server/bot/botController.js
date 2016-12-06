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

console.log("module exported", module.exports);