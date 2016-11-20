var sqp;

function importConnection(conn){
   sqp = conn;
}

const logError = function(err,b){
  console.log('err',err);
  console.log('b',b);
}
//<----------------------USERS---------------------->>

const addUser = function({name: name, gmail: gmail, gmailAuthToken: gmailAuthToken, fbPassword: fbPassword, fbUsername: fbUsername}) {
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

//<----------------------BOTS---------------------->>

<<<<<<< cec1919b2f7023cacbf943fc0a968566163edd7f
const addBotToUser = function(userId, {botName: botName, botType: botType}){
=======
const addBotToUser = function(userId, {botName: botName, botType: botType = 'basic'}){
>>>>>>> finish db refactor, add all persistance mutation functions
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

const updateBot = function({botId: botId, botName: botName = 'unnamed', botType: botType = 'basic'}){
    const q = `UPDATE bot SET botName=${sqp.escape(botName)},botType=${sqp.escape(botType)} WHERE id=${sqp.escape(botId)} `
    return sqp.query(q).then((data)=>data.affectedRows);
}

const deleteBot = function({botId: botId}){
  const deleteBotQuery = `DELETE FROM bot WHERE id=${sqp.escape(botId)}`
  const deleteInJoin = `DELETE FROM users_bots where id_bot=${botId}`;
  return sqp.query(deleteInJoin)
  .then(()=>sqp.query(deleteBotQuery))
  .then((data)=>data.affectedRows);
}

const getBot = function(botId){
    const q = `SELECT * FROM bot G WHERE id=${botId}`;
    return sqp.query(q);
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

const removeSelectedContact = function({contactId: contactId}) {
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
}

//<----------------------TASKS---------------------->>

const addToTasks = function(botId, {date: date, platform: platform, message: message, task: task}) {
  //add to tasks table
  const q1 = `INSERT INTO tasks(date, platform, message, task) 
    values(${sqp.escape(date)}, ${sqp.escape(platform)}, ${sqp.escape(message)}, ${sqp.escape(task)})`;

  return sqp.query(q1)
    .then(data => {
      const taskId = data.insertId;

      //add entry in join table with bot
      const q2 = `INSERT INTO tasks_bots(id_bot, id_task) values(${sqp.escape(botId)}, ${sqp.escape(taskId)})`;
      return sqp.query(q2).then((data)=>taskId);
      })
};

const removeSelectedTask = function({taskId: taskId}) {
  const q1 = `DELETE FROM tasks_bots WHERE id_task=${sqp.escape(taskId)}`;
  const q2 = `DELETE FROM tasks WHERE id=${taskId}`;
  //delete from join table is bots_contacts
  return sqp.query(q1)
    .then(data => {
      //delete from contacts
      return sqp.query(q2).then((data)=>data.affectedRows);
    });
};

const updateSelectedTask = function({taskId: taskId, date: date, platform: platform, message: message, task: task}) {
  const updateContactQuery = `UPDATE tasks SET date=${sqp.escape(date)}, 
    platform=${sqp.escape(platform)}, message=${sqp.escape(message)}, task=${sqp.escape(task)}
     WHERE id=${sqp.escape(taskId)}`;
    return sqp.query(updateContactQuery).then((data)=>data.affectedRows);
};

const getSelectedTasks = function(botId) {
  const selectContactsQuery = `SELECT * FROM tasks G 
  INNER JOIN tasks_bots J ON J.id_task=G.id WHERE J.id_bot=${botId}`;
  return sqp.query(selectContactsQuery);
}

// const deleteBotContacts = function({botId: botId}) {
//   const deleteQuery = `DELETE FROM selectedGmailContacts G 
//   INNER JOIN bot_contacts J ON G.id=J.id_contact WHERE G.id=${sqp.escape(botId)}`;

//   return sqp.query(deleteQuery)
//     .then(data => data.affectedRows);
// }

module.exports = {
  addBotToUser: addBotToUser,
  deleteBot: deleteBot,
  updateBot: updateBot,
  getBot: getBot,
  addToSelectedContacts: addToSelectedContacts,
  removeSelectedContact: removeSelectedContact,
  updateSelectedContact: updateSelectedContact,
  getSelectedContacts: getSelectedContacts,
  addToTasks: addToTasks,
  removeSelectedTask: removeSelectedTask,
  updateSelectedTask: updateSelectedTask,
  getSelectedTasks: getSelectedTasks,
  importConnection: importConnection,
  addUser: addUser,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
}