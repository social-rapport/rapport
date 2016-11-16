var db = require('./db');

//ROUTE FOR NAM
// tasks.getAllTasksToday = function(){
//   var date = new Date();
//   var data = [recipientName, recipientEmail, userEmail, userName, message];
// }


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
    recipientEmailExists: function(email, callback){
      var query = "SELECT * FROM recipient WHERE email="+db.escape(email);
      db.query(query, function(err, recips){
        if(err){throw err;}
        if(recips.length!==0){
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
    getAllTasks: function (callback) {
      // Get all tastks
      var query = 'SELECT * FROM Tasks';
      db.query(query, function(err, tasks) {
        if(err){ throw err;}
        //console.log(tasks);
        callback(err, tasks);
      });
    },
    exists:function(userId, botType, cb){
      var botQuery = "SELECT id FROM bot WHERE id_users="+db.escape(userId)+" AND botName='basic'";
      db.query(botQuery, function(err, result){
        if(result.length===0){
          cb(false);
        } else {
          cb(true);
        }
      });
    },
    getBotTasks: function(botType, userId, cb){
      //want all tasks with bot id
      //to get id need to search bot table for botsName with userId
      //use botId to get all tasks with that iD
      //from those tasks, use recipient id to find recipient info
      var botQuery = "SELECT id FROM bot WHERE id_users="+db.escape(userId)+" AND botName='basic'";
      db.query(botQuery, function(err, botId){
        var botIdNum = botId[0].id;
        var tasksByBotQuery = "SELECT * FROM tasks where id_bot="+db.escape(botIdNum);
        db.query(tasksByBotQuery, function(err, tasksByBot){
          if(err){throw err;}
          var selectedContacts = {};

          // cb(tasksByBot[0].id_recipient);
          //for each id_recipient, get their name, birthday, email
          var recurse = function(length, index){
            if(length===index){
              cb(selectedContacts);
              return;
            }
            var recipQuery = "SELECT * FROM recipient WHERE id="+db.escape(tasksByBot[index].id_recipient);
            db.query(recipQuery, function(err, recips){
              if(err){throw err;}
              selectedContacts[recips[0].name] = {};
              selectedContacts[recips[0].name].birthday = recips[0].birthday;
              selectedContacts[recips[0].name].email = recips[0].email;
              recurse(length, index+1);
            });
          };
          recurse(tasksByBot.length, 0);
        });
      });
    }
  },
  tasks: {
    updateTasksFlow:function(instructions, userId, callback){
      //if bot does not exist, add new bot
      //if exists, get bot id
      module.exports.bot.exists(userId, 'basic', function(bool){
        if(!bool){
          var botQuery = "INSERT into bot(botName, id_users) values('basic', "+db.escape(userId)+")";
          db.query(botQuery, function(err, addedBot){
            if(err){throw err;}
            module.exports.tasks.updateTasksRecursive(instructions, userId, callback);
          });
        } else {
          module.exports.tasks.updateTasksRecursive(instructions, userId, callback);
        }
      });
    },
    updateTasks:function(instructions, userId, callback){
      //try recursive loop
      for(var key in instructions[0].selectedContacts){
            var date = new Date();
            var recipientEmail = instructions[0].selectedContacts[key].email;
            console.log('key is ', key);
            console.log('recipientEmail is', recipientEmail);

            var recipQuery = "INSERT into recipient(name, email, birthday) values("+db.escape(key)+","+db.escape(recipientEmail)+","+db.escape(instructions[0].selectedContacts[key].birthday)+")";

            //ADDING TO RECIPIENTS TABLE
            db.query(recipQuery, function(err, newRecip){
              if(err){throw err;}
              console.log('from recip query ',newRecip);
              module.exports.tasks.addToTables(instructions, userId, callback);

              //ADDING TO TASKS TABLE
              var query = "INSERT INTO tasks(id_recipient, date, platform, id_bot, task) values((SELECT id from recipient WHERE email="+db.escape(recipientEmail)+"),"+db.escape(date)+","+"'gmail', (SELECT id FROM bot WHERE botName='basic' AND id_users="+db.escape(userId)+"), 'sayHiGmail')";
              console.log('recipientEmail is ', recipientEmail);

              db.query(query,function(err, added){
                if(err){throw err;}
                console.log('from query ', added);
              });
            });
        }
      callback('added successfully');
    },
    updateTasksRecursive: function(instructions, userId, callback){
      var keys = Object.keys(instructions[0].selectedContacts);

      var recurse = function(length, index){
        if (length === index) {
          return;
        }
        var date = new Date();
        var recipientEmail = instructions[0].selectedContacts[keys[index]].email;
        var recipQuery = "INSERT into recipient(name, email, birthday) values("+db.escape(keys[index])+","+db.escape(recipientEmail)+","+db.escape(instructions[0].selectedContacts[keys[index]].birthday)+")";

        db.query(recipQuery, function(err, newRecip){
          if(err){throw err;}
          var query = "INSERT INTO tasks(id_recipient, date, platform, id_bot, task) values((SELECT id from recipient WHERE email="+db.escape(recipientEmail)+"),"+db.escape(date)+","+"'gmail', (SELECT id FROM bot WHERE botName='basic' AND id_users="+db.escape(userId)+"), 'sayHiGmail')";
            console.log('recipientEmail is ', recipientEmail);

              db.query(query,function(err, added){
                if(err){throw err;}
                console.log('from query ', added);
                recurse(length, index+1);
              });
        });
      };
        recurse(keys.length, 0);
        callback('works');
      }
    },
    // addToTables: function(instructions, userId, callback){
    //   for(var key in instructions[0].selectedContacts){
    //     var recipientEmail = instructions[0].selectedContacts[key].email;
    //     module.exports.gmail.recipientEmailExists(recipientEmail, function(res){
    //       if(res){
    //         var date = new Date();
    //         var query = "INSERT INTO tasks(id_recipient, date, platform, id_bot, task) values((SELECT id from recipient WHERE email="+db.escape(recipientEmail)+"),"+db.escape(date)+","+"'gmail', (SELECT id FROM bot WHERE botName='basic' AND id_users="+db.escape(userId)+"), 'sayHiGmail')";
    //           console.log('recipientEmail is ', recipientEmail);

    //         db.query(query,function(err, added){
    //           if(err){throw err;}
    //           console.log('from query ', added);
    //           callback(added);
    //         });
    //       }
    //     });
    //   }
    // }
  // },
  log: {
    saveTasks: function(task, callback){
    var taskQuery = 'INSERT INTO Log(id_recipient,id_bot,date, platform, message, task) values('+db.escape(task.id_recipient)+','+db.escape(task.id_bot)+','+db.escape(task.date)+','+db.escape(task.platform)+','+db.escape(task.message)+', '+db.escape(task.task)+')';
      db.query(taskQuery, function(err, result){
        if(err){throw err;}
        callback('success');
      });
    }
  }

}; //end exports

// unit test
// var tasks = {
//     date: '2016-11-15',
//     platform: 'gmail',
//     message: "hello",
//     task: 'sayHiGmail',
//     id_bot: 1,
//     id_recipient: 2,
// };

// module.exports.log.saveTasks(tasks, function(result){
//   console.log(result);
// });


//module.exports.users.get();
// helper
//var query = 'insert into chatData(username, text, roomname) \
//                      value (?, ?, ?)';