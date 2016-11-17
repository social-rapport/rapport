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
var server = null;
var chai = require('chai');
var expect = chai.expect;
//var Promise = require('bluebird');
//var _ = require('underscore');

server = 'http://127.0.0.1:5050';

var postA = function(){
  return rp.post(server+'/raw-postings',{json: postingsExamples[0]});
}

var deleteall = function(){return rp.delete(server+'/raw-postings/?date=0');};

//setup
beforeEach(function(done){
  //console.log('deleting db')
  done();
})

//testing
describe ('static assets: /',function(){
  it('serves index',function(done){
    request(server+'/').on('response',function(res){
      expect(res.statusCode).to.equal(200);
      console.log(res.statusCode);
      done();
    })
  });
});

//authenticated routs

describe('api route: signIn',function(){


});

//not yet authenticated
describe('api route: bots',function(){


});

//AUTHENTICATED ROUTES 
describe('api route: contacts',function(){

  it.only('returns a list of contacts',function(done){
    rp.get(`${server}/api/gmail/contacts?token=${idToken}`).then(function(r){
      console.log('get contacts result:', r);
    })
    .then(done())
    .catch();
  }) 
    
});

