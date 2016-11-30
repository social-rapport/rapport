var sqp = null;

function injectConnection(conn){
   sqp = conn;
   console.log('db connection injected');
}

const logError = function(err,b){
  console.log('err',err);
  console.log('b',b);
}
//<----------------------USERS---------------------->>

const addUser = function({name: name, gmail: gmail, gmailAuthToken: gmailAuthToken, fbPassword: fbPassword = null, fbUsername: fbUsername = null}) {
  const addUserQuery = `INSERT INTO users(name, gmail, gmailAuthToken, fbPassword, fbUsername)
  values(${sqp.escape(name)},${sqp.escape(gmail)},${sqp.escape(gmailAuthToken)},${sqp.escape(fbPassword)},${sqp.escape(fbUsername)})`;
  return sqp.query(addUserQuery).then((data)=> data.insertId);
};

const deleteUser = function({userId: userId}) {
  const deleteUserquery = `DELETE FROM users WHERE id=${sqp.escape(userId)}`;
  return sqp.query(deleteUserquery).then((data)=>data.affectedRows);
};

const updateUser = function(userId,{name: name, gmail: gmail, gmailAuthToken: gmailAuthToken, fbPassword: fbPassword, fbUsername: fbUsername}) {
  const updateUserQuery = `UPDATE users SET name=${sqp.escape(name)},gmail=${sqp.escape(gmail)},
  gmailAuthToken=${sqp.escape(gmailAuthToken)},fbPassword=${sqp.escape(fbPassword)},
  fbUsername=${sqp.escape(fbUsername)} WHERE id=${sqp.escape(userId)}`;
  return sqp.query(updateUserQuery).then((data)=>data.affectedRows);
};

const getUser = function(userId){
  const q = `SELECT * FROM users WHERE id=${sqp.escape(userId)}`
  return sqp.query(q).then((data)=>data[0]);
};

const getUserFromGmail = function(gmail) {
  const q = `SELECT * FROM users WHERE gmail=${sqp.escape(gmail)}`;
  return sqp.query(q).then((data)=>data[0]);
};

const updateFacebookCredentials = function(userId, {fbEmail: fbEmail, fbPassword: fbPassword}) {
  const q = `UPDATE users SET fbUsername=${sqp.escape(fbEmail)}, fbPassword=${sqp.escape(fbPassword)}`;
  return sqp.query(q).then(data => data.affectedRows);
};

const getFacebookCredentials = function(userId) {
  const q = `SELECT fbUsername, fbPassword FROM users WHERE id=${sqp.escape(userId)}`;
  return sqp.query(q).then(data => data[0]);
}

//<----------------------BOTS---------------------->>

const addBotToUser = function(userId, {botName: botName, botType: botType = 'basic'}){
  //insert into bot
  const insertBotQuery = `INSERT INTO bot(botName, botType) values(${sqp.escape(botName)}, ${sqp.escape(botType)})`;
  return sqp.query(insertBotQuery)
  .then(function(addedBotInfo){
    const botId = addedBotInfo.insertId;
    const updateJoinQuery = `INSERT INTO users_bots(id_user, id_bot) values(${sqp.escape(userId)}, ${sqp.escape(botId)})`;
    //insert into join table
    return sqp.query(updateJoinQuery).then((data)=>botId);
  });
};

const updateBot = function({id: botId, botName: botName = 'unnamed', botType: botType = 'basic'}){
    const q = `UPDATE bot SET botName=${sqp.escape(botName)},botType=${sqp.escape(botType)} WHERE id=${sqp.escape(botId)} `
    return sqp.query(q).then((data)=>data.affectedRows);
};

const deleteBot = function(botId){

  const deleteBotQuery = `DELETE FROM bot WHERE id=${sqp.escape(botId)}`
  const deleteInUserJoin = `DELETE FROM users_bots where id_bot=${botId}`;

  return sqp.query(deleteInUserJoin)
    .then(()=>sqp.query(deleteBotQuery))
    .then((data)=>data.affectedRows);
};

const getBot = function(botId){
    const q = `SELECT * FROM bot G WHERE id=${botId}`;
    return sqp.query(q);
};

const getUserBots = function(userId) {
  const q = `SELECT id_bot FROM users_bots J INNER JOIN users U ON U.id=J.id_user WHERE U.id =${sqp.escape(userId)}`;

  return sqp.query(q)
    .then(data => data.map(x => x.id_bot));
}

//<----------------------CONTACTS---------------------->>

const addToSelectedContacts = function(botId, {name: name, email: email, birthday: birthday=null}) {
  //add to contacts table
  const addContactQuery = `INSERT INTO selectedGmailContacts(name, email, birthday)
    values(${sqp.escape(name)}, ${sqp.escape(email)}, ${sqp.escape(birthday)})`;

  return sqp.query(addContactQuery)
    .then(addedContactInfo => {
      const contactId = addedContactInfo.insertId;

      //add connection to bot_contacts join table
      const updateJoinQuery = `INSERT INTO bot_contacts(id_bot, id_contact) values(${sqp.escape(botId)}, ${sqp.escape(contactId)})`;
      return sqp.query(updateJoinQuery).then((data)=>contactId);
      })
};

const updateSelectedContact = function({contactId: contactId, name: name, email: email, birthday: birthday}) {
  const updateContactQuery = `UPDATE selectedGmailContacts SET name=${sqp.escape(name)},
    email=${sqp.escape(email)}, birthday=${sqp.escape(birthday)} WHERE id=${sqp.escape(contactId)}`;
    return sqp.query(updateContactQuery).then((data)=>data.affectedRows);
};

const removeSelectedContact = function(contactId) {
  const deleteJoinQuery = `DELETE FROM bot_contacts WHERE id_contact=${sqp.escape(contactId)}`;
  const deleteContactQuery = `DELETE FROM selectedGmailContacts WHERE id=${contactId}`;
  //delete from join table is bots_contacts
  return sqp.query(deleteJoinQuery)
    .then(deleteInfo => {
      //delete from contacts
      return sqp.query(deleteContactQuery).then((data)=>data.affectedRows);
    });
};

const getSelectedContacts = function(botId) {
  const selectContactsQuery = `SELECT * FROM selectedGmailContacts G
  INNER JOIN bot_contacts J ON J.id_contact=G.id WHERE J.id_bot=${botId}`;
  return sqp.query(selectContactsQuery);
};


//<----------------------TASKS---------------------->>

const addToTasks = function(botId, {date: date, platform: platform, message: message, task: task, interval: interval=null}) {
  //add to tasks table
  const q1 = `INSERT INTO tasks(date, platform, message, task, \`interval\`)
    values(${sqp.escape(date)}, ${sqp.escape(platform)}, ${sqp.escape(message)}, ${sqp.escape(task)}, ${sqp.escape(interval)})`;

  return sqp.query(q1)
    .then(data => {
      const taskId = data.insertId;
      //add entry in join table with bot
      const q2 = `INSERT INTO tasks_bots(id_bot, id_task) values(${sqp.escape(botId)}, ${sqp.escape(taskId)})`;
      return sqp.query(q2).then((data)=>taskId);
      })
};

const removeSelectedTask = function(taskId) {
  const q1 = `DELETE FROM tasks_bots WHERE id_task=${sqp.escape(taskId)}`;
  const q2 = `DELETE FROM tasks WHERE id=${taskId}`;
  //delete from join table is bots_contacts
  return sqp.query(q1)
    .then(data => {
      //delete from contacts
      return sqp.query(q2).then((data)=>data.affectedRows);
    });
};

const updateSelectedTask = function({id: taskId, date: date, platform: platform, message: message, task: task, interval: interval}) {
  const updateContactQuery = `UPDATE tasks SET date=${sqp.escape(date)},platform=${sqp.escape(platform)}, 
  message=${sqp.escape(message)}, task=${sqp.escape(task)},\`interval\`=${sqp.escape(interval)} 
  WHERE id=${sqp.escape(taskId)}`;

  return sqp.query(updateContactQuery).then((data)=>data.affectedRows);
};

const updateTaskDate = function(id, date) {
  const q = `UPDATE tasks SET date=${sqp.escape(date)} WHERE id=${sqp.escape(id)}`;

  return sqp.query(q).then(data => data.affectedRows);
}

const getSelectedTasks = function(botId) {
  const selectContactsQuery = `SELECT * FROM tasks G
  INNER JOIN tasks_bots J ON J.id_task=G.id WHERE J.id_bot=${botId}`;
  return sqp.query(selectContactsQuery);
};

const getTasksByUserId = function(userId) {
  const userGmailQuery = `SELECT * FROM tasks T
    INNER JOIN tasks_bots J ON J.id_task = T.id
    INNER JOIN bot B ON J.id_bot = B.id
    INNER JOIN users_bots JJ ON JJ.id_bot=B.id
    INNER JOIN users U ON U.id=JJ.id_user
    INNER JOIN bot_contacts JJJ ON JJJ.id_bot=B.id
    INNER JOIN selectedGmailContacts G ON G.id=JJJ.id_contact
    WHERE U.id=${sqp.escape(userId)}`;

  const userFacebookQuery = `SELECT * FROM tasks T
    INNER JOIN tasks_bots TB ON T.id=TB.id_task
    INNER JOIN bot B ON TB.id_bot=B.id
    INNER JOIN users_bots UB ON UB.id=B.id
    INNER JOIN users U ON U.id=UB.id_user
    INNER JOIN selectedFacebookFriends F ON F.id_bot=B.id
    WHERE U.id=${sqp.escape(userId)}`;

  return Promise.all([sqp.query(userGmailQuery), sqp.query(userFacebookQuery)])
    .then(resolveArray => [].concat.apply([], resolveArray))
};

const getTasksByBotId = function(botId) {
  const botQueryGmail = `SELECT * FROM tasks T
    INNER JOIN tasks_bots J ON J.id_task = T.id
    INNER JOIN bot B ON J.id_bot = B.id
    INNER JOIN users_bots JJ ON JJ.id_bot=B.id
    INNER JOIN users U ON U.id=JJ.id_user
    INNER JOIN bot_contacts JJJ ON JJJ.id_bot=B.id
    INNER JOIN selectedGmailContacts G ON G.id=JJJ.id_contact
    WHERE B.id=${sqp.escape(botId)}`;

  const botQueryFacebook = `SELECT * FROM tasks T
    INNER JOIN tasks_bots TB ON T.id=TB.id_task
    INNER JOIN bot B ON TB.id_bot=B.id
    INNER JOIN users_bots UB ON UB.id=B.id
    INNER JOIN users U ON U.id=UB.id_user
    INNER JOIN selectedFacebookFriends F ON F.id_bot=B.id
    WHERE B.id=${sqp.escape(botId)}`;

  return Promise.all([sqp.query(botQueryGmail), sqp.query(botQueryFacebook)])
    .then(resolveArray => [].concat.apply([], resolveArray))
}


const getTasksJoinedWithUsers = function(date) {
  const q = `SELECT * FROM tasks T
    INNER JOIN tasks_bots J ON J.id_task=T.id
    INNER JOIN bot B ON J.id_bot = B.id
    INNER JOIN users_bots JJ ON JJ.id_bot=B.id
    INNER JOIN users U ON U.id=JJ.id_user
    INNER JOIN bot_contacts JJJ ON JJJ.id_bot=B.id
    INNER JOIN selectedGmailContacts G ON G.id=JJJ.id_contact
    WHERE T.date=${sqp.escape(date)} OR G.birthday=${sqp.escape(date)} OR T.date='today'`;

  const q2 = `SELECT * FROM tasks T
    INNER JOIN tasks_bots TB ON T.id=TB.id_task
    INNER JOIN bot B ON TB.id_bot=B.id
    INNER JOIN users_bots UB ON UB.id=B.id
    INNER JOIN users U ON U.id=UB.id_user
    INNER JOIN selectedFacebookFriends F ON F.id_bot=B.id
    WHERE T.date=${sqp.escape(date)} OR F.birthday=${sqp.escape(date)} OR T.date='today'`;

    return Promise.all([sqp.query(q), sqp.query(q2)])
      .then(resolveArray => [].concat.apply([],resolveArray));
};

//<----------------------FACEBOOK FRIENDS---------------------->>

const addToSelectedFacebookFriends = function(botId, {fullName: fullName, vanity: vanity, birthday: birthday = null}) {
  const q = `INSERT INTO selectedFacebookFriends(name, vanityName, birthday, id_bot)
    values(${sqp.escape(fullName)}, ${sqp.escape(vanity)}, ${sqp.escape(birthday)}, ${sqp.escape(botId)})`;

  console.log("add fb friend args", arguments);
  console.log("add fb friend query", q);
  return sqp.query(q).then(data => data.insertId);
};

const removeSelectedFacebookFriend = function(friendId) {
  const q = `DELETE FROM selectedFacebookFriends WHERE id=${sqp.escape(friendId)}`;
  return sqp.query(q).then(data => data.affectedRows);
};

const updateSelectedFacebookFriend = function({id: id, fullName: fullName, name: name, vanityName: vanityName, birthday: birthday}) {
  const q = `UPDATE selectedFacebookFriends SET name=${sqp.escape(fullName || name)}, vanityName=${sqp.escape(vanityName)},
    birthday=${sqp.escape(birthday)} WHERE id=${sqp.escape(id)}`;

  return sqp.query(q).then(data => data.affectedRows);
};

const getSelectedFacebookFriends = function(botId) {
  const q = `SELECT * FROM selectedFacebookFriends WHERE id_bot=${sqp.escape(botId)}`;
  return sqp.query(q);
}

//<----------------------LOG---------------------->>

const addToLog = function({date: date, platform: platform, message: message, task: task, id_bot: id_bot, id_user: id_user}){
  const q = `INSERT INTO log(date, platform, message, task, id_bot, id_user)
    values(${sqp.escape(date)}, ${sqp.escape(platform)}, ${sqp.escape(message)},
    ${sqp.escape(task)}, ${sqp.escape(id_bot)}, ${sqp.escape(id_user)})`;


  return sqp.query(q)
};

const getUserLog = function(userId) {
  const q = `SELECT * FROM log WHERE id_user=${sqp.escape(userId)}`;
  return sqp.query(q);
};

const getBotLog = function(botId) {
  const q = `SELECT * FROM log WHERE id_bot=${sqp.escape(botId)}`;
  return sqp.query(q);
};

const deleteSingleLog = function(logId) {
  const q = `DELETE FROM log WHERE id=${sqp.escape(logId)}`;
  return sqp.query(q).then(data => data.affectedRows);
};

const deleteBotLogs = function(botId) {
  const q = `DELETE FROM log WHERE id_bot=${sqp.escape(botId)}`;
  return sqp.query(q).then(data => data.affectedRows);
};

const deleteUserLogs = function(userId) {
  const q = `DELETE FROM log WHERE id_user=${sqp.escape(UserId)}`;
  return sqp.query(q).then(data => data.affectedRows);
};


module.exports = {
  addBotToUser: addBotToUser,
  deleteBot: deleteBot,
  updateBot: updateBot,
  getBot: getBot,
  getUserBots: getUserBots,
  addToSelectedContacts: addToSelectedContacts,
  removeSelectedContact: removeSelectedContact,
  updateSelectedContact: updateSelectedContact,
  getSelectedContacts: getSelectedContacts,
  addToTasks: addToTasks,
  removeSelectedTask: removeSelectedTask,
  updateSelectedTask: updateSelectedTask,
  getSelectedTasks: getSelectedTasks,
  injectConnection: injectConnection,
  addUser: addUser,
  getUser: getUser,
  getUserFromGmail: getUserFromGmail,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getTasksJoinedWithUsers: getTasksJoinedWithUsers,
  getFacebookCredentials: getFacebookCredentials,
  updateFacebookCredentials: updateFacebookCredentials,
  addToSelectedFacebookFriends: addToSelectedFacebookFriends,
  removeSelectedFacebookFriend: removeSelectedFacebookFriend,
  updateSelectedFacebookFriend: updateSelectedFacebookFriend,
  getSelectedFacebookFriends: getSelectedFacebookFriends,
  getTasksByBotId: getTasksByBotId,
  getTasksByUserId: getTasksByUserId,
  addToLog: addToLog,
  getUserLog: getUserLog,
  getBotLog: getBotLog,
  deleteSingleLog: deleteSingleLog,
  deleteBotLogs: deleteBotLogs,
  deleteUserLogs: deleteUserLogs,
  updateTaskDate: updateTaskDate
};