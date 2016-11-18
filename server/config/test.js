const auth0Utils = require('../utils/auth0_utils.js');
var token = require('../../env.js').ADMIN_IDTOKEN;
var dbModel = require('../db/dbModel.js');

auth0Utils.userObjFromToken(token,function(userObj){
    
    dbModel.gmail.emailExists(userObj.email, function(exists){
        if(exists){
            getUserData(userObj);
        } else if (!exists){
            saveNewUser(userObj);
        }
    });
})

function saveNewUser(userObj){
    dbModel.users.saveNewUser(userObj, function(saved){
        return {
            username: userObj.name,
            email: userObj.email,
            newUser: true,
            };
        });
}

function getUserData(){
    dbModel.users.getBasicUserData(userObj.email, function(info){
        return info;
    });
}

function resolveUserModel(userObj){
    return new Promise(resolve,reject){

    }
}

