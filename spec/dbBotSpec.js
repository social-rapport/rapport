var env = require('../env.js');
require('./typey.js');

var chai = require('chai');
var expect = chai.expect;

var mysql = require('promise-mysql');
var connection;
var dbModel = require('../server/db/dbModel.js');
var _dbModel = require('../server/db/_dbModel.js');

var auth0 = require('../server/utils/auth0_utils.js');

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DBPASS || require('../env.js').DB_PASS,
    database: 'rapport'
}).then(function(conn,x){
    connection = conn;
});


//<-------------------QUERY DEFINITIONS------------------->

var getUsers = function(){ return connection.query('select * from users')};
var getBots = function(){ return connection.query('select * from bot');}
var getTasks = function(){ return connection.query('select * from bot');};
var deleteBots = function(){ return connection.query('delete from bot')};
var deleteTasks = function(){ return connection.query('delete from Tasks where ')};
var deleteUsers = function(){ return connection.query('delete from users')};
var deleteGmail = function(){ return connection.query('delete from gmail')};



//<-------------------User Data------------------->

var idToken = env.ADMIN_IDTOKEN;
var emailInfo = {
  contactsLength: 389,
  email: 'jproche5@gmail.com',
}

//<-------------------Bot Data------------------->

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

var contacts2 = [
        {
            email: 'b@c',
            name: 'Jane',
            photo: '123',
        }
    ]

var bot2 = {
    "bots":[
        {"botType":"basic",
        "tasks":[
            "sayHappyBirthdayGmail",
            "sayHappyBirthdayFacebook",
            "sayHiGmail","sayHiFacebook"],
        "selectedContacts":[],
        "botActivity":{
            "recent":[],
            "scheduled":[]}
        }]
    };
        
//<-------------------BEFORE-EACH------------------->
beforeEach(function(done){
    _dbModel.deleteBot(1,'basic',function(res){
        console.log(res);
        done();
    })
});

//<-------------------USER DATA------------------->
//todo: server responds with 200

describe ('identifying user',function(){

  xit('converts tokens to emails and auth0ids',function(done){
    auth0.getUserIdFromToken(idToken)
    .then(function(a,b){
        console.log(a);
        expect(a.email);
    })
    .then(done)
    .catch(done)
  });

  xit('gets a userObject from a token', function(done){
    auth0.userObjFromToken(idToken,function(res){
        expect(res.email);
        done();
    });
  });

  xit('gets a database id from email',function(done){
      dbModel.users.getIdFromEmail(emailInfo.email,function(id){
          expect(id.length);
          done();
      })
  })

  it('gets basic user data',function(done){
        dbModel.users.getBasicUserData(emailInfo.email,function(data, err){
            console.log(data, err);
            expect(data.email).to.equal(emailInfo.email);
            done();
        })
    });
});

//<-------------------GETTING BOTS------------------->

describe('getting bots for the user',function(){
    xit('gets all the bot information for a user',function(done){
        //not yet implemented
    })
});

//<-------------------ADDING AND REMOVING BOTS------------------->
describe('knows whether bots exist for a user and botType',function(){
    xit('returns 0 when there are no bots for a user',function(done){
        dbModel.bot.exists(1, function(res){
            console.log(res);
            expect(res).to.equal(false);
            done();
        });
    });
});

describe('adding and removing bots',function(){
    xit('adds a single bot to an empty user with a user Id',function(done){
        dbModel.tasks.updateTasksFlow(bot1,1,function(res){
            _dbModel.getBots(emailInfo.email,function(res){
               console.log(res);
               expect(res.length).to.equal(1);
           })
        });
    });

    xit('removes a single bot by name and userId',function(done){
        _dbModel.deleteBot(1,'basic',function(res){
           _dbModel.getBots(emailInfo.email,function(res){
               console.log(res);
               expect(res.length).to.equal(0);
           })
        })
    })
    
});

//<-------------------GETTING TASKS------------------->
describe ('getting tasks for a single botName and userId',function(){
    xit('gets tasks for a bot',function(done){
        dbModel.bots._getTasks(1, 'basic',function(results){

        });
    });
});


