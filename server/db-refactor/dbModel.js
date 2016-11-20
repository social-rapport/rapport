var sqp;

function importConnection(conn){
   sqp = conn;
}

const logError = function(err,b){
  console.log('err',err);
  console.log('b',b);
}
//<----------------------USERS---------------------->>

const addUser = function(name, gmail, gmailAuthToken, fbPassword = null, fbUsername = null) {
  const addUserQuery = `INSERT INTO users(name, gmail, gmailAuthToken, fbPassword, fbUsername)
  values(${sqp.escape(name)},${sqp.escape(gmail)},${sqp.escape(gmailAuthToken)},${sqp.escape(fbPassword)},${sqp.escape(fbUsername)})`;
  return sqp.query(addUserQuery).then((data)=> data.insertId);
};

const deleteUser = function(userId) {
  const deleteUserquery = `DELETE FROM users WHERE id=${sqp.escape(userId)}`;
  return sqp.query(deleteUserquery).then((data)=>data.affectedRows);
};

const updateUser = function(userId, name, gmail, gmailAuthToken, fbPassword = null, fbUsername = null) {
  const updateUserQuery = `UPDATE users SET name=${sqp.escape(name)},gmail=${sqp.escape(gmail)},
  gmailAuthToken=${sqp.escape(gmailAuthToken)},fbPassword=${sqp.escape(fbPassword)}, 
  fbUsername=${sqp.escape(fbUsername)} WHERE id=${sqp.escape(userId)}`;
  return sqp.query(updateUserQuery).then((data)=>data.affectedRows);
};

//<----------------------BOTS---------------------->>

const addBotToUser = function(userId, bot){
  //insert into bot
  const insertBotQuery = `INSERT INTO bot(botName, botType) values(${sqp.escape(bot.botName)}, ${sqp.escape(bot.botType)})`;
  return sqp.query(insertBotQuery)
  .then(function(addedBotInfo){
    const botId = addedBotInfo.insertId;
    const updateJoinQuery = `INSERT INTO users_bots(id_user, id_bot) values(${sqp.escape(userId)}, ${sqp.escape(botId)})`;
    //insert into join table
    return sqp.query(updateJoinQuery).then((data)=>botId);
  });
};

const deleteBot = function(botId){
  const deleteBotQuery = `DELETE FROM bot WHERE id=${sqp.escape(botId)}`
  const deleteInJoin = `DELETE FROM users_bots where id_bot=${botId}`;
  return sqp.query(deleteInJoin)
  .then(()=>sqp.query(deleteBotQuery))
  .then((data)=>data.affectedRows);
}

const updateBot = function(botId,botName='unnamed',botType='basic'){
    const q = `UPDATE bot SET botName=${sqp.escape(botName)},botType=${sqp.escape(botType)} WHERE id=${sqp.escape(botId)} `
    return sqp.query(q).then((data)=>data.affectedRows);
}

//<----------------------CONTACTS---------------------->>

const addToSelectedContacts = function(botId, name, email, birthday = null) {
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

const updateSelectedContact = function(contactId, name, email, birthday) {
  const updateContactQuery = `UPDATE selectedGmailContacts SET name=${sqp.escape(name)}, 
    email=${sqp.escape(email)}, birthday=${sqp.escape(birthday)} WHERE id=${sqp.escape(contactId)}`;
    return sqp.query(updateContactQuery).then((data)=>data.affectedRows);
};

const getSelectedContacts = function(botId) {
  const selectContactsQuery = `SELECT * FROM selectedGmailContacts G 
  INNER JOIN bot_contacts J ON J.id_contact=G.id WHERE J.id_bot=${botId}`;
  return sqp.query(selectContactsQuery);
}

//<----------------------TASKS---------------------->>

const addToTasks = function(botId, date, platform, message, task) {
  //add to tasks table
  const q1 = `INSERT INTO tasks(date, platform, message, task) 
    values(${sqp.escape(date)}, ${sqp.escape(platform)}, ${sqp.escape(message)}, ${sqp.escape(task)})`;

  return sqp.query(q1)
    .then(data => {
      const taskId = data.insertId;

      //add entry in join table with bot
      const q2 = `INSERT INTO tasks_bots(id_bot, id_task) values(${sqp.escape(botId)}, ${sqp.escape(taskId)})`;
      return sqp.query(q2).then((data)=>contactId);
      })
};

// const removeSelectedContact = function(contactId) {
//   const deleteJoinQuery = `DELETE FROM bot_contacts WHERE id_contact=${sqp.escape(contactId)}`;
//   const deleteContactQuery = `DELETE FROM selectedGmailContacts WHERE id=${contactId}`;
//   //delete from join table is bots_contacts
//   return sqp.query(deleteJoinQuery)
//     .then(deleteInfo => {
//       //delete from contacts
//       return sqp.query(deleteContactQuery).then((data)=>data.affectedRows);
//     });
// };

// const updateSelectedContact = function(contactId, name, email, birthday) {
//   const updateContactQuery = `UPDATE selectedGmailContacts SET name=${sqp.escape(name)}, 
//     email=${sqp.escape(email)}, birthday=${sqp.escape(birthday)} WHERE id=${sqp.escape(contactId)}`;
//     return sqp.query(updateContactQuery).then((data)=>data.affectedRows);
// };

// const getSelectedContacts = function(botId) {
//   const selectContactsQuery = `SELECT * FROM selectedGmailContacts G 
//   INNER JOIN bot_contacts J ON J.id_contact=G.id WHERE J.id_bot=${botId}`;
//   return sqp.query(selectContactsQuery);
// }

module.exports = {
  addBotToUser: addBotToUser,
  deleteBot: deleteBot,
  updateBot: updateBot,
  addToSelectedContacts: addToSelectedContacts,
  removeSelectedContact: removeSelectedContact,
  updateSelectedContact: updateSelectedContact,
  getSelectedContacts: getSelectedContacts,
  addToTasks: addToTasks,
  importConnection: importConnection,
  addUser: addUser,
  updateUser: updateUser,
  deleteUser, deleteUser,
}