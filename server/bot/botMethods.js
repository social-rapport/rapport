const gmail = require('../config/gmailController.js');
const facebook = require('../facebook/fbchatController.js');
const dbq = require('../db-refactor/dbQueries.js');


function scheduleNext(taskObj) {
  const interval = taskObj.interval;
  let newMonth = new Date().getMonth() + interval;

  if(newMonth > 12){
    newMonth -= 12;
  }

  const newDate = `${newMonth}\/${new Date().getDate()}`;

  return dbq.updateTaskDate(taskObj.id_task, newDate); 
}

module.exports = {

  sayHiGmail: function(taskObj) {
    const msgData = {
      username: taskObj.name,
      useremail: taskObj.gmail,
      emailTo: taskObj.email,
      subject: "whooooot! this is from Nam",
      body: `${taskObj.message}<br/>`
    };

    return new Promise((resolve, reject) => {
      gmail.sendMailBot(msgData, taskObj.gmailAuthToken, results => {
        scheduleNext(taskObj)
          .then(() => resolve(taskObj));
      });
    });
  },
  sayHappyBirthdayGmail: function (taskObj) {
    const msgData = {
      username: taskObj.name,
      useremail: taskObj.gmail,
      emailTo: taskObj.email,
      subject: "Happy Birthday " + taskObj.name + "!!!",
      body: `${taskObj.message}<br/>`
    };

    return new Promise((resolve, reject) => {
      gmail.sendMailBot(msgData, taskObj.gmailAuthToken, results => {
        scheduleNext(taskObj)
          .then(() => resolve(taskObj));
      });
    })
    
  },
  sayHappyHolidayGmail: function (taskObj) {
    const msgData = {
      username: taskObj.name,
      useremail: taskObj.gmail,
      emailTo: taskObj.email,
      subject: "Happy Holidays!!!",
      body: `${taskObj.message}<br/>`
    };

    return new Promise((resolve, reject) => {
      gmail.sendMailBot(msgData, taskObj.gmailAuthToken, results => {
        scheduleNext(taskObj)
          .then(() => resolve(taskObj));
      });
    })

  },
  sayHappyBirthdayFacebook: function(taskObj) {
    let auth = {};
    auth.email = taskObj.fbUsername;
    auth.password = taskObj.fbPassword;
    console.log("taskObj", taskObj);

    return new Promise((resolve, reject) => {
      facebook.sendMsg(auth, taskObj.vanityName, taskObj.message, data => {
        scheduleNext(taskObj)
          .then(() => resolve(taskObj));
      });
    })
    
  },
  sayHiFacebook: function(taskObj) {
    let auth = {};
    auth.email = taskObj.fbUsername;
    auth.password = taskObj.fbPassword;

    return new Promise((resolve, reject) => {
      facebook.sendMsg(auth, taskObj.vanityName, taskObj.message, data => {
        scheduleNext(taskObj)
          .then(() => resolve(taskObj));
      });
    });

  },

};