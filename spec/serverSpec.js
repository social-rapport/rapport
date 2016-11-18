var env = require('../env.js');
require('./typey.js');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DBPASS || require('../env.js').DB_PASS,
  database: 'rapport'
});

var request = require('request');
var rp = require('request-promise');
var chai = require('chai');
var expect = chai.expect;
server = 'http://127.0.0.1:5050';

//<-------------------TYPES------------------->

T.schema('botTypes',T.object({
    bots: T.array({
      '*>=1': T.object({
        botType: T.String,
        tasks: T.array({
          '&>1': T.String,
        }),
        selectedContacts: T.Array,
        botActivity:T.object({
            recent:T.Array,
            scheduled:T.Array,
          })
        })
    })
  }));

  T.schema('userObj',T.object({
      'email': T.String,
      'name': T.String,
      'newUser': T.Bool,
  }));

  T.schema('contacts',T.array({
      '*>=1': T.object({
        email: T.String,
        name: T.String,
        photo: T.String,
      })
  }));

//<-------------------ROUTE DEFINITIONS------------------->
var parse = function(res){ return JSON.parse(res);}

var getBotTypes = function(){return rp.get(`${server}/api/botTypes`);};

var postSignIn = function(){return rp.post(`${server}/signIn?token=${idToken}`);}
var getContacts = function(){return rp.get(`${server}/api/gmail/contacts?token=${idToken}`);};
var getBots = function(){return rp.get(`${server}/api/bots?email=${emailInfo.email}`);};
var postBots = function(body){return rp.put(`${server}/api/bots?email=${emailInfo.email}`,body);};

//<-------------------TEST USER------------------->

var idToken = env.ADMIN_IDTOKEN;
var emailInfo = {
  contactsLength: 389,
  email: 'jproche5@gmail.com',
}


//<-------------------BEFORE-EACH------------------->

beforeEach(function(done){
  done();
})

//<-------------------SERVICE OF STATIC ASSETS------------------->
//todo: server responds with 200
describe ('static assets: index page',function(){
  xit('serves index',function(done){
    rp(server+'/')
    .then(res=>{
      console.log(res);
    })
    .then(done)            
    .catch(done);
  });
});

//<-------------------AUTHENTICATION------------------->
//todo on server
it('does not accept unauthenticated calls to authenticated routes',function(){

})

//<-------------------UNAUTHENTICATED ROUTES------------------->
//finished test
describe('botTypes route',function(){

  it('returns :botTypes',function(done){
    getBotTypes()
    .then(parse)
    .then(function(res){
      expect(T.hasAll(res,'botTypes')).to.equal(true);
    })
    .then(done)            
    .catch(done);
  })

})

//<-------------------AUTHENTICATED ROUTES------------------->

describe('api route: signIn',function(){
//todo: refactor front end to take advantage of server using token as query
  it('returns a :userObj',function(done){
    postSignIn()
    .then(parse)
    .then(function(res){
      console.log('newUser',res);
      //expect(res.length).to.equal(100);
      expect(T.hasAll(res,'userObj')).to.equal(true);
    })
    .then(done)  
    .catch(done)
  }) 
});


describe('api route: contacts',function(){
  it('returns :contacts and correct length',function(done){
    getContacts()
    .then(parse)
    .then(function(res){
      console.log(res.length);
      console.log(res[0]);
      expect(T.hasAll(res,'contacts')).to.equal(true);
      expect(res.length).to.equal(emailInfo.contactsLength);
    })
    .then(done)
    .catch(done);
  }) 
});



describe('api route: getBots',function(){

  it('returns empty array if no bots',function(done){
    getBots()
    .then(parse)
    .then(function(res){
      console.log(res);
      expect(res.length).to.equal(0);
    })
    .then(done)            
    .catch(done);
  }) 

  it('returns empty array after bots are deleted',function(done){
    postBots({json: []})
    .then(getBots)
    .then(parse)
    .then(function(res){
      expect(res.length).to.equal(0);
    })
    .then(done)            
    .catch(done);
  }) 
});

describe('api route: postBots',function(){
  it.only('gets bot type, modifies, returns, gets updated',function(done){
    this.timeout(300000);
    getBotTypes()
    .then(parse)
    .then(function(res){
      return postBots({json: res});
    })
    .then(getBots)
    .then(parse)
    .then(function(res){
      expect(res.bots.length).to.equal(1);
    })
    .then(done)            
    .catch(done);
  }) 
});



describe('error handling',function(){

  xit('handles missing tokens',function(){


  });

  xit('handles incorrect tokens',function(){


  });

})


