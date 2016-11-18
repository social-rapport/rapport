var gmail = require('./gmailController.js');
const auth0Utils = require('../utils/auth0_utils.js');
var dbModel = require('../db/dbModel.js');
var bot = require('../bot/botController.js');

module.exports.oauth = "";

module.exports.checkIfNewUser = function(req, res){
<<<<<<< HEAD
  //first step gets userObj from the Auth0 JWT 
=======
  //first step gets userObj from the Auth0 JWT
>>>>>>> cleaned checkIfNewUser
  auth0Utils.getUserIdFromToken(req.body.idToken || req.req.query.token)
    .then(userObj => {
      const email = userObj.email;
      const name = userObj.name;

      //checks db to see if we have a user for that email
      //if yes, send back to FE
      //if no creates new user
      dbModel.gmail.emailExists(email, (exists) => {
        if(exists) {
         dbModel.users.getBasicUserData(email, (info) => {
           res.status(200).send(info);
         });

        } else {
          let newUserObj = {
            username: name,
            email: email,
            newUser: true
          }

          //does Auth0 handshaking to get oAuth token for gmail
          auth0Utils.getAccesstoken()
            .then(accessToken => {
              auth0Utils.getUserAccessKeys(userObj, accessToken)
                .then(authUserObj => {
                  const gmailInfo = auth0Utils.getGmailInfo(authUserObj);

                  //creates new user
                  dbModel.users.saveNewUser(gmailInfo, (saved) => {
                    if (saved) {
                      res.status(200).send(newUserObj);
                      res.end();
                    } else {
                      //TODO check error code
                      res.status(500).send('error occured while saving to the db')
                    }
                  });
                });
            });
        }
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
    // console.log('-----The token is this ', req.query.idToken);
    // auth0Utils.getUserIdFromToken(req.query.idToken)
    //   .then(userId => {
    //     auth0Utils.getAccesstoken()
    //       .then(accessToken => {
    //         auth0Utils.getUserAccessKeys(userId, accessToken)
    //           .then(userObj => {
    //             console.log("local gmail info",auth0Utils.getGmailInfo(userObj));
    //             var gmailInfo = auth0Utils.getGmailInfo(userObj);
                // var gmailInfo = {
                //   name: 'James Rocket',
                //   email: 'vi.uyen.vo@gmail.com',
                //   oauth: 'some secret oauth token for james'
                // };
                dbModel.users.getIdFromEmail(req.query.email, function(userId){
                  // console.log('the req.body.bots is ', req.body.bots);
                  // console.log('the userId is ', userId[0].id);
                  dbModel.bot.exists(userId[0].id, 'basic', function(bool){
                    if(!bool){
                      res.end(JSON.stringify([]));
                    } else {
                      dbModel.bot.getBotTasks('basic', userId[0].id, function(selectedContacts){
                        var contacts = [];

                        for(var key in selectedContacts){
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
                        console.log(selectedContacts);
                        res.end(JSON.stringify(data));
                      });
                    }
                  });
                });
      //         });
      //     });
      // });
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
  dbModel.tasks.getTasksForChronJob(function(data){
    res.send(data);
    res.end();
  });
};

module.exports.runalltasks = function(req, res){
  bot.runAllTasks(function(result){
    res.send(result);
    res.end();
  });

};
