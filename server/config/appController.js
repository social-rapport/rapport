const path = require('path');
var gmail = require('./gmailController.js');
const auth0Utils = require('../utils/auth0_utils.js');
const facebook = require('../facebook/fbchatController.js');
var dbM = require('../db-refactor/dbModel.js');
var dbQ = require('../db-refactor/dbQueries.js');
const bot = require('../bot/botController.js');
var types = require('../db-refactor/types');
var holidayUtils = require('../utils/holiday_utils.js');

module.exports.oauth = "";

//<---------------------RESTRICTED METHODS (ACCESSED AFTER AUTH)--------------------->
module.exports.updateUserInfo = function(req, res){
  var userId = req.query.userId;
  var authInfo = req.authInfo;
  var newUserData = auth0Utils.getGmailInfo(authInfo);
  dbQ.getUserFromGmail(newUserData.gmail)
  .then(function (oldUserData){
    if(!oldUserData){
      var currentUserData  = Object.assign(types.initialUser, newUserData);
      dbQ.addUser(currentUserData).then(function(userId){
        dbQ.getUser(userId).then(function(newUserData){
          newUserData.newUser = true;
          newUserData.fbCredentials = !!(newUserData.fbPassword && newUserData.fbUsername);
          res.status(200).send(newUserData);
        });
    });
  } else {
      var currentUserData = Object.assign(oldUserData,newUserData)
      dbQ.updateUser(currentUserData.id, currentUserData)
      .then(function(){
        dbQ.getUser(currentUserData.id)
        .then(function(data){
          currentUserData.newUser = false;
          currentUserData.fbCredentials = !!(currentUserData.fbPassword && currentUserData.fbUsername);
          res.status(200).send(currentUserData);
        });
      });
    };
  });
};
//<---------------------Updates Facebook Credentials--------------------->
module.exports.updateFacebookCredentials = function(req, res) {
  const auth = {
    email: req.body.fbEmail,
    password: req.body.fbPassword
  };

  facebook.checkIfValidCredentials(auth)
  .then(() => {
    dbQ.updateFacebookCredentials(req.query.userId, req.body)
    .then(() => res.status(200).send('updated user\'s facebook info'))
    .catch((error) => req.status(500).send('error saving the credentials: ', error));
  })
  .catch(error => res.status(500).send(`invalid credentials: ${error}`));
  
};
//<---------------------Gets Facebook Friends--------------------->
module.exports.getFacebookFriends = function(req, res) {
  dbQ.getFacebookCredentials(req.query.userId)
    .then(fbCredentialObj => {
      let fbAuth = {};
      fbAuth.email = fbCredentialObj.fbUsername;
      fbAuth.password = fbCredentialObj.fbPassword;
      return fbAuth;
    })
    .then(facebook.getFriendsList)
    .then(friends => res.status(200).send(friends))
    .catch(error => res.status(500).send(error));
};
//<---------------------Removes Facebook Friends--------------------->
module.exports.removeFacebookFriends = function(req, res) {
  dbQ.removeSelectedFacebookFriend([req.query.contactId])
    .then(() => res.status(200).send('removed friend'));
};
//<---------------------Removes Gmail Contacts--------------------->
module.exports.removeGmailContacts = function(req, res) {
  dbM.removeFromSelectedContacts([req.query.contactId])
    .then(() => res.status(200).send('removed friend'));
};
//<---------------------Removes Tasks--------------------->
module.exports.removeRegisteredTasks = function(req, res) {
  dbM.removeFromRegisteredTasks(req.body.tasks)
    .then(() => res.status(200).send('removed tasks!')); 
};

//<---------------------Gets Tasks--------------------->
module.exports.getTasks = function(req, res) {
  res.status(200).send(types.taskList);
};

//<-------------------return the bot type so FE can change it------------------->
module.exports.getBotTypes = function(req, res){
  var data = {bots: types.initialBots,
    tasks: types.taskList  
  };
  res.end(JSON.stringify(data));
};

//<-------------------get all the users bot information------------------->
  module.exports.getBotInfo = function(req, res) {
    dbM.getAllUserBots(req.query.userId)
    .then((data)=>res.end(JSON.stringify(data)));
  };

//<-------------------change the users bots on a post------------------->
module.exports.updateBots = function(req, res){
  dbM.updateOrCreateUserBots(req.query.userId,req.body.bots)
  .then((data)=>{
    res.send(data);
    res.end();
  });
};
module.exports.deleteBot = function(req, res){
  dbM.getAllBotInfo(req.query.botId)
    .then(dbM.retireBot)
    .then((data)=>{
      res.sendStatus(200);
    });
};
module.exports.getTasksForChron = function(req, res){
  dbModel.tasks.getTasksForChronJob( data =>{
    res.send(data);
    res.end();
  });
};
module.exports.runalltasks = function(req, res){
  bot.runAllTasks( result => {
    res.send(result);
    res.end();
  });
};
//<------------------- return holiday dates ------------------->
module.exports.getHolidayDates = function(req, res){
  holidayUtils.holidayDates(req.query.year)
  .then((data)=>{
    res.status(200).send(data);
  });
};
