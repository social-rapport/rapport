const dbq = require('./dbQueries.js');

//<----------------------Per User---------------------->>

const updateOrCreateUserBots = function(userId, botsArray) {
   return Promise.all(botsArray.map(botObj => updateOrCreateNewBot(userId, botObj)));
};

const getAllUserBots = function(userId) {

  return new Promise((resolve, reject) => {
    dbq.getUserBots(userId)
      .then(botIdArray => Promise.all(botIdArray.map(botId => getAllBotInfo(botId))))
      .then(resolve)
      .catch(reject);
  });

};


//<----------------------Per Bot---------------------->>

const updateOrCreateNewBot = function(userId, botObj) {
  if(botObj.botId) {
    return updateAllBotInfo(botObj);
  } else {
    return createAllBotInfo(userId, botObj);
  }
};

const createAllBotInfo = function(userId, botObj) {

  return new Promise((resolve, reject) => {
    dbq.addBotToUser(userId, botObj)
    .then(botId => Promise.all([addOrUpdateSelectedContacts(botId, botObj.selectedContacts),
      addOrUpdateRegisteredTasks(botId, botObj.tasks)]))
    .then(resolve)
    .catch(reject);
  });

};

const updateAllBotInfo = function(botObj) {
  return new Promise((resolve, reject) => {
    dbq.updateBot(botObj)
      .then(botId => Promise.all([addOrUpdateSelectedContacts(botObj.botId, botObj.selectedContacts),
        addOrUpdateRegisteredTasks(botObj.botId, botObj.tasks)]))
      .then(resolve)
      .then(reject);
  });

};

const getAllBotInfo = function(botId) {

  let botObj = {
    botId: null,
    botType: null,
    botName: null,
    tasks: [],
    selectedContacts: [],
    botActivity: {
      recent: [],
      scheduled: []
    }
  };

  return new Promise ((resolve, reject) => {
    Promise.all([dbq.getBot(botId),dbq.getSelectedContacts(botId), dbq.getSelectedTasks(botId)])
      .then(arrayOfBotInfo => {
        //massage data into botObj; 
        botObj.botId = arrayOfBotInfo[0][0].id;
        botObj.botType = arrayOfBotInfo[0][0].botType;
        botObj.botName = arrayOfBotInfo[0][0].botName || arrayOfBotInfo[0][0].botType;
        botObj.selectedContacts = arrayOfBotInfo[1];
        botObj.tasks = arrayOfBotInfo[2];

        resolve(botObj)
      }).catch(reject);
  });
};


//<-----------------------COLLECTIONS----------------------->

const addOrUpdateSelectedContacts = function (botId, contactArray) {
  return Promise.all(contactArray.map(contactObj => addOrUpdateContact(botId,contactObj)));
};

const addOrUpdateContact = function(botId, contactObj) {
  if(contactObj.contactId) {
    return dbq.updateSelectedContact(contactObj);
  } else {
    return dbq.addToSelectedContacts(botId, contactObj);
  }
};


const addOrUpdateRegisteredTasks = function(botId, taskArray) {
  return Promise.all(taskArray.map(taskObj => addOrUpdateTask(botId, taskObj)));
};


const addOrUpdateTask = function(botId, taskObj) {
  if(taskObj.taskId) {
    return dbq.updateSelectedTask(taskObj);
  } else {
    return dbq.addToTasks(botId, taskObj);
  }
};







//<----------------------Exports---------------------->>
module.exports = {
    getAllBotInfo: getAllBotInfo,
    getAllUserBots: getAllUserBots,
    addOrUpdateRegisteredTasks: addOrUpdateRegisteredTasks,
    addOrUpdateTask: addOrUpdateTask,
    addOrUpdateContact: addOrUpdateContact,
    addOrUpdateSelectedContacts: addOrUpdateSelectedContacts,
    updateAllBotInfo: updateAllBotInfo,
    createAllBotInfo: createAllBotInfo,
    updateOrCreateUserBots: updateOrCreateUserBots,
    updateOrCreateNewBot: updateOrCreateNewBot 
};

