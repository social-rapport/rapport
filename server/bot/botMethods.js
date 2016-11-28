const gmail = require('../config/gmailController.js');
const facebook = require('../facebook/fbchatController.js');

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
        //update date
        resolve(taskObj);
      });
    });
    

  },

  sayHappyBirthdayGmail: function (taskObj) {
    return taskObj;
  },

  sayHappyBirthdayFacebook: function(taskObj) {
    return taskObj;
  },

  sayHiFacebook: function(taskObj) {
    let auth = {};
    auth.email = taskObj.fbUsername;
    auth.password = taskObj.fbPassword;

    return new Promise((resolve, reject) => {
      facebook.sendMsg(auth, taskObj.vanityName, taskObj.message, data => {
        resolve(taskObj);
      });
    });
    
  },

};