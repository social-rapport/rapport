var gmail = require('./gmailController.js');
const auth0Utils = require('../utils/auth0_utils.js');
var dbM = require('../db/dbModel.js');
var dbQ = require('../db-refactor/dbQueries.js');
var bot = require('../bot/botController.js');
var types = require('../db-refactor/types');

module.exports.oauth = "";


//<---------------------RESTRICTED METHODS (ACCESSED AFTER AUTH)--------------------->

module.exports.updateUserInfo = function(req, res, authInfo){

  var userId = req.query.userId;
  var newUserData = auth0Utils.getGmailInfo(authInfo);

  dbQ.getUserFromGmail(newUserData.email)
  .then(function (oldUserData){
    if(!oldUserData){
      var currentUserData  = Object.assign(types.initialUser, newUserData);
      dbQ.addUser(currentUserData).then(function(userId){
        dbQ.getUser(userId).then(function(data){
          data.newUser = true;
          res.status(200).send(data);
        });
    }); 
  } else {
      var currentUserData = Object.assign(oldUserData,newUserData)
      dbQ.updateUser(currentUserData.id, currentUserData)
      .then(function(){
        dbQ.getUser(currentUserData.id)
        .then(function(data){
          currentUserData.newUser = false;
          res.status(200).send(currentUserData);
        });
      });
    };
  });

};

//<-------------------return the bot type so FE can change it------------------->
module.exports.getBotTypes = function(req, res){
  var data = {bots: types.initialBots};
  res.end(JSON.stringify(data));
};

//<-------------------get all the users bot information------------------->
  module.exports.getBotInfo = function(req, res) {
    dbModel.getAllUserBots()
    .then((data)=>res.end(JSON.stringify(data)));
  };

//<-------------------change the users bots on a post------------------->

module.exports.updateBots = function(req, res){
  dbM.updateOrCreateUserBots(req.query.id,req.body.bots);
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
