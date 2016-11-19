var env = require('../env.js');
require('./typey.js');
var dbModel = require('../server/db/dbModel.js');
var auth0 = require('../server/utils/auth0_utils.js');

var mysql = require('promise-mysql');
var connection;

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DBPASS || require('../env.js').DB_PASS,
    database: 'rapport'
}).then(function(conn,x){
    connection = conn;
});
console.log('conneciton is',connection)
var chai = require('chai');
var expect = chai.expect;

//<-------------------QUERY DEFINITIONS------------------->

var getUsers = function(){ return connection.query('select * from users')};
var getBots = function(){ return connection.query('select * from bot');}
var getTasks = function(){ return connection.query('select * from bot');};
var deleteBots = function(){ return connection.query('delete from bot')};
var deleteTasks = function(){ return connection.query('delete * from Tasks')};
var deleteUsers = function(){ return connection.query('delete from users')};
var deleteGmail = function(){ return connection.query('delete from gmail')};

//<-------------------BEFORE-EACH------------------->

// beforeEach(function(done){
    //  deleteBots()
    // .then(function(a,b){
    //     console.log(a,b);
    // })
    // .then(done)
    // .catch(function(err){
    //     console.log(err);
    //     done();
    // });
// })

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

var bot = {
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

//<-------------------dbModel Methods: Bots------------------->
//todo: server responds with 200

describe ('identifying user',function(){

  it('converts tokens to emails and auth0ids',function(done){
    auth0.getUserIdFromToken(idToken)
    .then(function(a,b){
        expect(a.email);
    })
    .then(done)
    .catch(done)
  });

  it('gets a userObject from a token', function(done){
    auth0.userObjFromToken(idToken,function(res){
        expect(res.email);
        done();
    });
  });

  it('gets a database id from email',function(done){
      dbModel.users.getIdFromEmail(emailInfo.email,function(id){
          expect(id.length);
          done();
      })
  })
});

describe ('getting data about the user', function(){
    it('gets basic user data',function(done){
        dbModel.users.getBasicUserData(emailInfo.email,function(data, err){
            console.log(data, err);
            expect(data.email).to.equal(emailInfo.email);
            done();
        })
    });
})

describe('adding bots for the user',function(){
    it.only('adds a single bot to an empty user',function(done){
        dbModel.tasks.updateTasksFlow(1,bot,function(res){
            console.log(res);
        });
    });
    
});

describe('deleting bots for the user',function(){

});

describe('getting bots for the user',function(){

});

describe ('getting tasks for a single botName and userId',function(){

    xit('gets tasks for a bot',function(done){
        
        dbModel.bots._getTasks('basic',1, function(results){
        });

    });


});


