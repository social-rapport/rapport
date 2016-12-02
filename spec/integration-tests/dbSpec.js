const request = require('request');
const expect = require('chai').expect;
const dbq = require('../../server/db-refactor/dbQueries.js');
const mysql = require('promise-mysql');
const sqp = require('../../server/db-refactor/dbQueries');

mysql.createConnection({
    host: process.env.DB_HOST || process.env.test || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || require('../../env.js').DB_PASS,
    database: process.env.DB || process.env.testDB || 'test'
}).then(function(conn,x){
    exportConn(conn);
    runTests();
}).catch(function(err){
    console.log(err);
});

function exportConn(conn){
  sqp.injectConnection(conn);
}

function runTests() {
  const userObject = {
    name: 'Chuck TESTa',
    gmail: 'test@gmail.com',
    gmailAuthToken: 'thisIsAGmailToken'
  }

  describe('test for the tests', () => {
    it('should definitely print something', (done) => {
      expect(true).to.equal(true);
      done();
    });
  });

  describe("user database methods", () => {
    it('should correctly create a new user', (done) => {
      dbq.addUser(userObject)
      .then(() => dbq.getUser(1))
      .then(returnedUserObj => {
        expect(returnedUserObj.name).to.equal('Chuck TESTa');
        expect(returnedUserObj.gmail).to.equal('test@gmail.com');
        expect(returnedUserObj.gmailAuthToken).to.equal('thisIsAGmailToken');
      })
      .then(done)
      .catch(done)
    });

    it('should correctly update a user record', (done) => {
      userObject.fbUsername = "chuckt@test.com";
      userObject.fbPassword = "chuckTesting";

      dbq.updateUser(userObject)
      .then(() => dbq.getUser(1))
      .then(returnedUserObject => {
        expect(returnedUserObject.fbUsername).to.equal('chuckt@test.com');
        expect(returnedUserObject.fbUsername).to.equal('chuckTesting');
      })
      .then(done)
      .catch(done)
    }); 

    it('should correctly delete a user', (done) => {
      dbq.deleteUser(userObject)
      .then(() => dbq.getUser(1))
      .then(returnedUserArray => {
        expect(returnedUserArray.length).to.equal(0);
      })
      .then(done)
      .catch(done)
    });
    

  });

  describe('bot database methods', () => {
    it('should correctly create a new user', (done) => {
      dbq.addUser(userObject)
      .then(() => dbq.getUser(1))
      .then(returnedUserObj => {
        expect(returnedUserObj.name).to.equal('Chuck TESTa');
        expect(returnedUserObj.gmail).to.equal('test@gmail.com');
        expect(returnedUserObj.gmailAuthToken).to.equal('thisIsAGmailToken');
      })
      .then(done)
      .catch(done)
    });

  });


}
