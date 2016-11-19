var gmail = require('./gmailController.js');
const auth0Utils = require('../utils/auth0_utils.js');
var dbModel = require('../db/dbModel.js');
var bot = require('../bot/botController.js');

module.exports.oauth = "";

module.exports.checkIfNewUser = function(req, res){

  Promise.all([auth0Utils.getUserIdFromToken(req.body.idToken || req.req.query.token),auth0Utils.getAccesstoken()])
    .then(arrayOfResolves => {
      auth0Utils.getUserAccessKeys(...arrayOfResolves)
      .then(authUserObj => {
        const userObj = arrayOfResolves[0];
        const gmailInfo = auth0Utils.getGmailInfo(authUserObj);
        const email = userObj.email;
        const name = userObj.name;

        console.log("gmail info", gmailInfo);
        dbModel.gmail.emailExists(email, exists => {
          //TODO: Save the oAuth token to the db at every login
          if(exists) {
          dbModel.users.getBasicUserData(email, (info) => {
            dbModel.users.updateUserOauth(email, gmailInfo.oauth, success => {
              res.status(200).send(info);
            });
          });

          } else {
            let newUserObj = {
              username: name,
              email: email,
              newUser: true
            }

            dbModel.users.saveNewUser(gmailInfo, saved => {
              if (saved) {
                res.status(200).send(newUserObj);
              } else {
                res.status(500).send('error occured while saving to the db');
              }
            });
          }
        });
      });
  });
}

  module.exports.updateBots = function(req, res){
    const email = req.query.email;
    const botsArray = req.body;
    console.log("email", email);
    console.log("body", botsArray);

    //if no body is provided. TODO:change 200 to correct status code
    if(botsArray.length === 0 ){
      dbModel.users.getIdFromEmail(email,function(userId){
        dbModel.bot.deleteAll(userId[0].id, function(data){
          console.log('deleted all bots');
          res.status(200).send('deleted all');
        })
      })
    } else {
      dbModel.users.getIdFromEmail(email, (userId) => {
        dbModel.tasks.updateTasksFlow(req.body, userId[0].id, (status) => {
          console.log("updated bots array status", status);
          //FOR DEMO ONLY: TODO: REMOVE AND REPLACE WITH CRON
          // bot.runAllTasks((statusMessage) => {
          //   console.log("email sent status", status);
          // });

          res.status(200).send('bots array updated');
        });
      });
    }
  };

  module.exports.getBotInfo = function(req, res) {
    dbModel.users.getIdFromEmail(req.query.email, userId => {
      const id = userId[0].id;

      dbModel.bot.exists(id, exists => {
        if(!exists){
          res.end(JSON.stringify([]));
        } else {

          dbModel.bot.getBotTasks('basic', id, selectedContacts => {
            let contacts = [];

            for(let key in selectedContacts) {
              contacts.push({
                name: key,
                birthday: selectedContacts[key].birthday,
                email: selectedContacts[key].email
              });
            }

            var data = {
              "bots":[{
                "botType":'basic',
                "tasks":[
                  'sayHappyBirthdayGmail',
                  'sayHappyBirthdayFacebook',
                  'sayHiGmail',
                  'sayHiFacebook'
                ],
                "selectedContacts":contacts,
                botActivity:{
                  "recent":[],
                  "scheduled":[]
                }
              }]
            };
            res.end(JSON.stringify(data));
          });
        }
      });
    });
  };

module.exports.getBotTypes = function(req, res){
  var data = {
    bots: [{
     botType: 'basic',
     tasks: [
            'sayHappyBirthdayGmail',
            'sayHappyBirthdayFacebook',
            'sayHiGmail',
            'sayHiFacebook'
     ],
     selectedContacts: [],
     botActivity:{
        recent:[],
        scheduled:[]
      }
    }]
  };
  res.end(JSON.stringify(data));
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
