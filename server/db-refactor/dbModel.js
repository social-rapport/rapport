var sqp;

function importConnection(conn){
   sqp = conn;
}

const logError = function(err,b){
  console.log('err',err);
  console.log('b',b);
}

const addBotToUser = function(bot, userId, cb){
  const insertBotQuery = `INSERT INTO bot(botName, botType) values(${sqp.escape(bot.botName)}, ${sqp.escape(bot.botType)})`;
  sqp.query(insertBotQuery)
  .then(function(addedBotInfo){
    const botId = addedBotInfo.insertId;
    const updateJoinQuery = `INSERT INTO users_bots(id_user, id_bot) values(${db.escape(userId)}, ${db.escape(botId)})`;
  })
  .catch(logError);
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

module.exports = {
  addBotToUser: addBotToUser,
  importConnection: importConnection,
}