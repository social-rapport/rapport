const auth0Utils = require('../utils/auth0_utils.js');
var token = require('../../env.js').ADMIN_IDTOKEN;
var dbModel = require('../db/dbModel.js');
var db = require('../db/db.js');


function addUser(){
    dbModel.users.getIdFromEmail('jproche5@gmail.com', function(userId){
                  dbModel.bot.exists(userId[0].id, 'standard', function(bool){
                    if(!bool){
                      res.end(JSON.stringify([]));
                    } else {
                      dbModel.bot._getBotTasks('basic', userId[0].id, function(selectedContacts){
                        var contacts = [];
                      });
                    }
                  })
    });
}

addUser();


//dbModel.database.drop(function(data){
    //dbModel.database.init();
//})
// auth0Utils.userObjFromToken(token,function(userObj){
    
// })

// function resolveUserAction((userObj){
//     dbModel.gmail.emailExists(userObj.email, function(exists){
//         if(exists){
//             getUserData(userObj);
//         } else if (!exists){
//             //saveNewUser(userObj);
//         }
//     });
// })

// function saveNewUser(userObj){
//     dbModel.users.saveNewUser(userObj, function(saved){
//         return {
//             username: userObj.name,
//             email: userObj.email,
//             newUser: true,
//             };
//         });
// }

// function getUserData(){
//     dbModel.users.getBasicUserData(userObj.email, function(info){
//         return info;
//     });
// }

