

const addBotToUser = function(bot, userId, cb){
  const insertBotQuery = `INSERT INTO bot(botName, id_users) values(${db.escape(bot.botType)}, ${db.escape(userId)})`;

  db.query(insertBotQuery, (err, addedBotInfo) => {
    if(err) console.log("error saving bot to database ===>", err);
    console.log("added bot". addedBotInfo);
    const botId = addedBotInfo.insertId;
    const updateJoinQuery = `INSERT INTO users_bots(id_user, id_bot) values(${db.escape(userId)}, ${db.escape(botId)})`;

    db.query(updateJoinQuery, (err, updatedJoinRow) => {
      if(err) console.log("error updating join table ===>", error);

      cb(botId);
    });
  });
};

const addSelectedContacts = function(botId, cb) {
  const addContactsQuery = `INSERT INTO recipient(name, email, birthday)`;

  db.query(addContactsQuery, (err, addedContactInfo) => {
    cb(addedContactInfo.insertId);
  });
};

const addTaskToBot = function(botId, taskObject, cb) {
  const addTaskQuery = `INSERT INTO Tasks(date, platforms, )`
};

const deleteUsersBot = function(userId, botId) {
  const deleteBotQuery = `DELETE FROM bot WHERE id_users=${db.escape(userId)} AND id=${db.escape(botId)}`
  "DELETE FROM bot WHERE id_users="+db.escape(userId)
};

const updateUsersBot = function(){

};