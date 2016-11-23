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

    gmail.sendMailBot(msgData, taskObj.gmailAuthToken, results => {
      console.log("send email results", results);
    });

  },

  sayHappyBirthdayGmail: function () {
    return 'in production!!!';
  },

  sayHappyBirthdayFacebook: function() {
    return 'in production!!!';
  },

  sayHiFacebook: function(taskObj) {
    let auth = {};
    auth.email = taskObj.fbUsername;
    auth.password = taskObj.fbPassword;
    console.log("taskObj", taskObj);

    facebook.sendMsg(auth, taskObj.vanityName, taskObj.message, data => {
      console.log(data);
    });
  },

};