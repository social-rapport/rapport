const gmail = require('../config/gmailController.js');
const facebook = require('../facebook/fbchatController.js');
const dbq = require('../db-refactor/dbQueries.js');
const giphy = require('giphy-api')();

function scheduleNext(taskObj) {
  const interval = taskObj.interval;
  let newMonth = new Date().getMonth() + interval;

  if(newMonth > 12){
    newMonth -= 12;
  }

  const newDate = `${newMonth}\/${new Date().getDate()}`;

  return dbq.updateTaskDate(taskObj.id_task, newDate);
}

function buildMsgData(taskObj, msgData){
  return new Promise((resolve, reject) => {
    dbq.getUser(taskObj.id_user)
    .then(user => {
      msgData.username = user.name;
      msgData.useremail = taskObj.gmail;
      msgData.emailTo = taskObj.email;
      resolve(msgData);
    });
  });
}

function addGiphy(giphyQuery, msgData, taskObj) {
  return new Promise((resolve, reject) => {
    giphy.random(giphyQuery)
    .then(gifRes => {
      msgData.body = `${taskObj.message}<br/><img src=${gifRes.data.fixed_height_downsampled_url}></img>`;
      resolve(msgData);
    });
  })
}

module.exports = {

  sayHiGmail: function(taskObj) {
    const msgData = {
      subject: "Just a friendly 'hello'",
      body: `${taskObj.message}<br/>`
    };

    return new Promise((resolve, reject) => {
      buildMsgData(taskObj, msgData)
      .then(msgData => {
        gmail.sendMailBot(msgData, taskObj.gmailAuthToken, results => {
          scheduleNext(taskObj)
            .then(() => resolve(taskObj));
        });
      });
    });
  },
  sayHappyBirthdayGmail: function (taskObj) {
    const msgData = {
      subject: "Happy Birthday " + taskObj.name + "!!!",
    };

    return new Promise((resolve, reject) => {
      buildMsgData(taskObj, msgData)
      .then(msgData => addGiphy('birthday', msgData, taskObj))
      .then(msgData => {
        gmail.sendMailBot(msgData, taskObj.gmailAuthToken, results => {
          scheduleNext(taskObj)
            .then(() => resolve(taskObj));
        });
      });
    });

  },
  sayHappyHolidayGmail: function (taskObj) {
    const msgData = {
      subject: "Happy Holidays!!!",
      body: `${taskObj.message}<br/>`
    };

    return new Promise((resolve, reject) => {
      buildMsgData(taskObj, msgData)
      .then(msgData => {
        gmail.sendMailBot(msgData, taskObj.gmailAuthToken, results => {
          scheduleNext(taskObj)
            .then(() => resolve(taskObj));
        });
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