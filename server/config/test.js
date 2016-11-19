const auth0Utils = require('../utils/auth0_utils.js');
var token = require('../../env.js').ADMIN_IDTOKEN;
var dbModel = require('../db/dbModel.js');
var db = require('../db/db.js');
//var _dbModel = require('../db/_dbModel.js');

var contacts = [
    {
     email: 'a@b',
     name: 'John',
     photo: 'xyz',
    }
];

var bot1 = {
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

dbModel.tasks.addBotToUser(bot1.bots[0],1,function(res){
  console.log(res);
});
// dbModel.tasks.updateTasksFlow(bot1,1,function(res){
//             console.log('response is',res);

//         });

