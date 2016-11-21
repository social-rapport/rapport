const gmail = require('../config/gmailController.js');

module.exports = {

  sayHiGmail: function(taskObj) {
    const msgData = {
      username: taskObj.name,
      useremail: taskObj.gmail,
      emailTo: taskObj.email,
      subject: "whooooot! this is from Nam",
      body: `${taskObj.message}<br/>`
    };

    gmail.sendMailBot(msgData, taskObj.gmailAuthToken, results => {
      console.log("send email results", result);
    });

  },

  sayHappyBirthdayGmail: function () {
    return 'in production!!!';
  },

  sayHappyBirthdayFacebook: function() {
    return 'in production!!!';
  },

  sayHiFacebook: function() {
    return 'in production!!!';
  },

};