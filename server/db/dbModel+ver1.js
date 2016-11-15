var db = require('./db');

// mysql calls
module.exports = {
  users: {
    get: function (callback) {
      // Get all users
      var query = 'SELECT * FROM users';
      db.query(queryStr, function(err, users) {
        if(err){ throw err;}
        callback(err, users);
      });
    },
    post: function (params, callback) {
      var query = 'INSERT INTO users(userName) values (?)';
      db.query(query, params, function(err, user) {
        if(err){ throw err;}
        callback(err, user);
      });
    }
  },
  gmail: {
    get: function (callback) {
      db.getGmail(function(gmails){
        callback(gmails);
      });
    },
    post: function (params, callback) {
      //console.log(params);
      db.writeGmail(params, function(gmails) {
        console.log(gmails);
        callback(gmails);
      });
    }
  },
  facebook: {
    get: function (callback) {
      db.getFB(function(fbs){
        callback(fbs);
      });
    },
    post: function (params, callback) {
      //console.log(params);
      db.writeFB(params, function(fbs) {
        console.log(fbs);
        callback(fbs);
      });
    }
  },
  bot: {
    get: function (callback) {
      db.getBot(function(bots){
        callback(bots);
      });
    },
    post: function (params, callback) {
      //console.log(params);
      db.writeTasks(params, function(bots) {
        console.log(bots);
        callback(bots);
      });
    }
  },
  Tasks: {
    get: function (callback) {
      db.getTasks(function(tasks){
        callback(tasks);
      });
    },
    post: function (params, callback) {
      //console.log(params);
      db.writeTasks(params, function(tasks) {
        console.log(tasks);
        callback(tasks);
      });
    }

  },
  Log: {
    get: function (callback) {
      db.getLogs(function(logs){
        callback(logs);
      });
    },
    post: function (params, callback) {
      //console.log(params);
      db.writeLogs(params, function(logs) {
        console.log(logs);
        callback(logs);
      });
    }
  },

}; //end exports



// Get All users
exports.getUsers = function(callback){

  connection.query('SELECT * FROM users;', function(err, rows, fields){
    if(err){
      throw err;
    }
    console.log('The rows: ', rows);
    callback(rows);
  });
};