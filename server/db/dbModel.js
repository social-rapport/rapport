var db = require('./db');

// mysql calls
module.exports = {
  users: {
    get: function (callback) {
      // Get all users
      var query = 'SELECT * FROM users';
      db.query(query, function(err, users) {
        if(err){ throw err;}
        console.log(users);
        //callback(err, users);
      });
    },
    post: function (params, callback) {
      var query = 'INSERT INTO users(userName) values (?)';
      db.query(query, params, function(err, user) {
        if(err){ throw err;}
        callback(err, user);
      });
    },
    saveNewUser: function(params, callback) {
      var gmailQuery = 'INSERT INTO gmail(emailAddress, credentials) values('+db.escape(params.email)+','+db.escape(params.oauth)+')';
      db.query(gmailQuery, function(err, result){
        if(err){throw err;}
      });
      var userQuery = 'INSERT INTO users(userName, id_gmail) values('+db.escape(params.name)+',(SELECT id from gmail where emailAddress='+db.escape(params.email)+'))';
      db.query(userQuery, function(err, result){
        if(err){throw err;}
        callback(result);
      });
    },
    getBasicUserData: function(email, callback){
      var query = 'SELECT * FROM users WHERE id_gmail=(SELECT id FROM gmail WHERE emailAddress ='+db.escape(email)+')';
      db.query(query, function(err, result){
        if(err){throw err;}
        var data = {
          name: result[0].userName,
          email: email,
          newUser:false
        };
        callback(data);
      });
    },
    getIdFromEmail: function(email, callback){
      var query = 'SELECT id FROM users WHERE id_gmail=(SELECT id FROM gmail WHERE emailAddress ='+db.escape(email)+')';
      db.query(query, function(err, userId){
        if(err){throw err;}
        callback(userId);
      });
    }
  },
  gmail: {
    get: function (callback) {
      // Get all gmail data
      var query = 'SELECT * FROM gmail';
      db.query(queryStr, function(err, users) {
        if(err){ throw err;}
        callback(err, users);
      });
    },
    emailExists: function(email, callback){
      var query = 'SELECT * FROM gmail WHERE emailAddress = '+db.escape(email);
      // var query = 'select * from gmail';
      db.query(query, function(err, users) {
        if(err){ throw err;}
        if(users.length!==0){
          callback(true);
        } else {
          callback(false);
        }
      });
    },
    post: function (params, callback) {
      var query = 'INSERT INTO gmail(credentials) values (?)';
      db.query(query, params, function(err, gmail) {
        if(err){ throw err;}
        callback(err, gmail);
      });
    }
  },
  facebook: {

  },
  bot: {

  },
  tasks: {
    updateTasks:function(instructions, userId, callback){
    //   var botQuery = "INSERT into bot(botName, id_users) values('basic', "+db.escape(userId)+")";
    //   db.query(botQuery, function(err, addedBot){
    //     if(err){throw err;}
    //   });


    //   for(var key in instructions[0].selectedContacts){
    //     var recipientEmail = instructions[0].selectedContacts[key].email;
    //     var date = new Date();
    //     var query = "INSERT INTO tasks(recipient, date, platform, id_bot, task) values("+db.escape(recipientEmail)+","+db.escape(date)+","+"'gmail', (SELECT id FROM bot WHERE botName='basic' AND id_users="+db.escape(userId)+"), 'sayHiGmail')";
    //     db.query(query,function(err, added){
    //       if(err){throw err;}
    //     });
    //   }
    //   callback('added successfully');
    }
  },
  Log: {

  }

}; //end exports

module.exports.users.get();
// helper
//var query = 'insert into chatData(username, text, roomname) \
//                      value (?, ?, ?)';