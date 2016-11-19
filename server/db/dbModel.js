var db = require('./db');

function handleError(cb, err,result){
  if(typeof cb !== 'function'){err = cb}
  if(err){
    throw err;
  } else {
    if(cb)cb(result);
  }
}

function lengthToBool(cb, data){
  if(data.length!==0){
    if(cb)cb(true);
  } else {
    if(cb)cb(false);
  }
}

module.exports = {
  database: {
    drop: function(callback){
      var q = 'DROP DATABASE rapport';
      db.query(q,handleError.bind(null,callback));
    },
    deleteAll: function(callback){
      var q = 'DELETE * FROM bot';
      db.query(q,handleError.bind(null,callback));
    },
    init: function(cb){
      var q = 'SOURCE ../db/schema.sql'
      db.query(q,handleError);
    },
  },
  //<------------USERS--------->

  users: {
    //<---------remove if not using
    get: function (callback) {
      var query = 'SELECT * FROM users';
      db.query(query, handleError.bind(null,console.log));
    },
    post: function (params, callback) {
      var query = 'INSERT INTO users(userName) values (?)';
      db.query(query, params, handleError.bind(null,callback));
    },
    updateUserOauth: function(email, newOauthToken, callback) {
      var query = `UPDATE gmail SET credentials=${db.escape(newOauthToken)}WHERE emailAddress=${db.escape(email)}`;
      db.query(query, handleError.bind(null, callback));
    },
    saveNewUser: function(params, callback) {
      var gmailQuery = 'INSERT INTO gmail(emailAddress, credentials) values('+db.escape(params.email)+','+db.escape(params.oauth)+')';
      db.query(gmailQuery, function(err, result){
        if(err){throw err;}
      });
      var userQuery = 'INSERT INTO users(userName, id_gmail) values('+db.escape(params.name)+',(SELECT id from gmail where emailAddress='+db.escape(params.email)+'))';
      db.query(userQuery, handleError.bind(null,callback));
    },
    getIdFromEmail: function(email, callback){
      var query = 'SELECT id FROM users WHERE id_gmail=(SELECT id FROM gmail WHERE emailAddress ='+db.escape(email)+')';
      db.query(query, handleError.bind(null,callback));
    },
    getOauthFromEmail: function(email, callback) {
      var query = `SELECT credentials FROM gmail WHERE emailAddress=${db.escape(email)}`;
      db.query(query, handleError.bind(null, callback));
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
  },
  //<------------GMAIL--------->
  gmail: {
    get: function (callback) {
      // Get all gmail data
      var query = 'SELECT * FROM gmail';
      db.query(queryStr, handleError.bind(null,callback));
    },
    emailExists: function(email, callback){
      var q = 'SELECT * FROM gmail WHERE emailAddress = '+db.escape(email);
      var cb = lengthToBool.bind(null,callback);
      db.query(q,handleError.bind(null,cb));
    },
    recipientEmailExists: function(email, callback){
      var query = "SELECT * FROM recipient WHERE email="+db.escape(email);
      var cb = lengthToBool.bind(null,callback);
      db.query(query, handleError.bind(null,cb));
    },
    getEmailOauthFromGmailId: function(gmailId, callback){
      var query = 'SELECT emailAddress, credentials FROM gmail where id='+db.escape(gmailId);
      db.query(query, handleError.bind(null,callback));
    },
    post: function (params, callback) {
      var query = 'INSERT INTO gmail(credentials) values (?)';
      db.query(query, params, handleError.bind(null,callback));
    }
  },
  facebook: {

  },
  recipient:{
    getInfoWithId: function(id, callback){
      var query = "SELECT * FROM recipient WHERE id="+db.escape(id);
      db.query(query, handleError.bind(null,callback));
    }
  },
  //<------------BOT--------->

  bot: {
    botId: function(userId, botName, callback){
      var q = "select id from bot where id_users="+db.escape(userId)+" and botName="+db.escape(botName);
      db.query(q, handleError.bind(null, callback));
    },
    deleteById: function(botId,callback){
      var q1 = "delete from Tasks where id_bot="+db.escape(botId);
      db.query(q1, function(err,res){
        var q2 = "delete from bot where id="+db.escape(botId);
        db.query(q2, handleError.bind(null,callback));
      });
    },
    getAllTasks: function (callback) {
      var query = 'SELECT * FROM Tasks';
      db.query(query, handleError.bind(null,callback));
    },
    exists:function(userId, callback){
      var q = "SELECT id FROM bot WHERE id_users="+db.escape(userId);
      var cb = lengthToBool.bind(null,callback);
      console.log('passed');
      db.query(q, handleError.bind(null,cb));
    },
    deleteAll: function(userId,cb){
      var q = "DELETE FROM bot WHERE id_users="+db.escape(userId);
      db.query(q, handleError.bind(null,cb));
    },
    _getBotTasks: function(userId, botName,cb){
      var q = `select name, email, birthday from recipient where id= (select id_recipient from Tasks where id = (select id from Tasks where id_bot =
(select id from bot where botName = 'basic' AND id_users = 1)));`;
      db.query(q,handleError.bind(null,cb));
    },
    getBotTasks: function(botType, userId, cb){

      //<------------needs to be a join--------->
      // agreed




      //want all tasks with bot id
      //to get id need to search bot table for botsName with userId
      //use botId to get all tasks with that iD
      //from those tasks, use recipient id to find recipient info
      var botQuery = "SELECT id FROM bot WHERE id_users="+db.escape(userId)+" AND botName='basic'";
      db.query(botQuery, function(err, botId){
        var botIdNum = botId[0].id;
        var tasksByBotQuery = "SELECT * FROM Tasks where id_bot="+db.escape(botIdNum);
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
    //TODO: add a param for botTYpe
    updateTasksFlow:function(instructions, userId, callback){
      //if bot does not exist, add new bot
      //if exists, get bot id
      //<-------------------need to check if this particular bot exists, not any bot for this user------------>
      module.exports.bot.exists(userId, function(bool){
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
    //CONTOLLER
    getTasksForChronJob:function(cb){
      var data = [];
      var oneTask = {};
      var date = new Date();
      date = String(date).slice(4, 15);
      // var date = 'Nov 12 2016';
      console.log(date);
      //get everything from tasks table with today's date
      module.exports.tasks.getTasksByDate(date, true, function(formatedTasks){

        var recurse = function(length, index){
          if(length===index){
            cb(data);
            return;
          }
          oneTask.tasks = formatedTasks[index];
          var botId = formatedTasks[index].id_bot;
          var recipId = formatedTasks[index].id_recipient;
          var query =
            "SELECT userName, id_gmail FROM users where id=(SELECT id_users FROM bot where id ="+db.escape(botId)+")";
          db.query(query, function(err, users){
            if(err){throw err;}
            oneTask.user = users[0];
            module.exports.gmail.getEmailOauthFromGmailId(users[0].id_gmail, function(email){
              oneTask.user.userEmail = email[0].emailAddress;
              oneTask.user.oauth = email[0].credentials;
              // console.log('recipID is -----------------',recipId);
              module.exports.recipient.getInfoWithId(recipId, function(recipInfo){
                // console.log('recipt info ----------', recipInfo);
                oneTask.recipient = {
                  name : recipInfo[0].name,
                  email : recipInfo[0].email,
                  birthday : recipInfo[0].birthday
                };
                console.log('one task is ------',oneTask);
                // var copy = {};
                // for(var key in oneTask){
                //   copy[key] = oneTask[key];
                // }
                var copy = Object.assign({}, oneTask);
                data.push(copy);
                recurse(length, index+1);
              });
            });
          });
        };
        recurse(formatedTasks.length, 0);
      });

      //RECURSE so that for each task
        //if finished recursing, cb(data);
        //format task and add results to oneTask
        //use botid to look up user
        //format users and add to oneTask
        //use recipientId to look up recipientInfo
        //formate recipients and add to one Task
          //push oneTask to data;
      //call recurse
    },
    getTasksByDate: function(date, format, cb){
      var query = "SELECT * FROM Tasks WHERE date="+db.escape(date);
      db.query(query, function(err, tasks){
        if(err){throw err;}
        if(tasks.length===0){
          cb('no tasks for provided day');
        } else if(format){
          module.exports.tasks.formatTasks(tasks, cb);
        } else {
          cb(tasks);
        }
      });
    },
    formatTasks: function(tasks, cb){
      cb(tasks);
    },
    updateTasks:function(instructions, userId, callback){
      //try recursive loop
      for(var key in instructions[0].selectedContacts){
            var date = new Date();
            date = date.slice(0, 10);
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
      console.log('instruction is -------',instructions.bots[0].selectedContacts);
      var arr = instructions.bots[0].selectedContacts;
      // var arr = instructions[0].selectedContacts;

      var recurse = function(length, index){
        if (length === index) {
          return;
        }
        var date = new Date();
        date = String(date).slice(4, 15);
        var recipientEmail = arr[index].email;

        module.exports.gmail.recipientEmailExists(recipientEmail, function(bool){
          if(!bool){
            var recipQuery = "INSERT into recipient(name, email, birthday) values("+db.escape(arr[index].name)+","+db.escape(recipientEmail)+","+db.escape(arr[index].birthday)+")";

            db.query(recipQuery, function(err, newRecip){
              if(err){throw err;}
              var query =
              "INSERT INTO Tasks(id_recipient, date, platform, id_bot, task) values((SELECT id from recipient WHERE email="+db.escape(recipientEmail)+"),"+db.escape(date)+","+"'gmail', (SELECT id FROM bot WHERE botName='basic' AND id_users="+db.escape(userId)+"), 'sayHiGmail')";
                console.log('recipientEmail is ', recipientEmail);

                  db.query(query,function(err, added){
                    if(err){throw err;}
                    console.log('from query ', added);
                    recurse(length, index+1);
                  });
            });
          } else {
            recurse(length, index+1);
          }
        });
      };
      recurse(arr.length, 0);
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