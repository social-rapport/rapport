var env = require('../env.js');
var mysql = require('mysql');
console.log('testing')
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
console.log('idToken',idToken);
var postA = function(){
  //return rp.post(server+'/raw-postings',{json: postingsExamples[0]});
}

//var deleteall = function(){return rp.delete(server+'/raw-postings/?date=0');};
var parse = function(res){ return JSON.parse(res);}

//test email info
var idToken = env.ADMIN_IDTOKEN;
var emailInfo = {
  contactsLength: 389,
}
//setup
beforeEach(function(done){
  done();
})

//testing
describe ('static assets: /',function(){
  xit('serves index',function(done){
    rp(server+'/')
    .then(res=>{
      console.log(res);
    })
    .then(done)            
    .catch(done);
  });
});


//UNAUTHENTICATED ROUTES

describe('botTypes route',function(){

  it('returns an array',function(done){
    rp.get(`${server}/api/botTypes`)
    .then(parse)
    .then(function(res){
      expect(res.length);
    })
    .then(done)            
    .catch(done);
  })

})

//authenticated routs

describe('api route: signIn',function(){


});

//not yet authenticated
describe('api route: bots',function(){
  xit('returns an array',function(done){
    rp.get(`${server}/api/bots?token=${idToken}`)
    .then(parse)
    .then(function(res){
      console.log(res);
    })
    .then(done)            
    .catch(done);
  }) 

});

//AUTHENTICATED ROUTES 
describe('api route: contacts',function(){

  it('returns an array of length equal to contactsLength',function(done){
    rp.get(`${server}/api/gmail/contacts?token=${idToken}`)
    .then(parse)
    .then(function(res){
      expect(res.length).to.equal(emailInfo.contactsLength);
    })
    .then(done)            
    .catch(done);
  }) 

  xit('returns an array of :contacts',function(done){
    
  }) 
    
});

describe('error handling',function(){

  xit('handles undefined tokens',function(done){
  
  });



})

