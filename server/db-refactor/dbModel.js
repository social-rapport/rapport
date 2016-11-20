const dbq = require('./dbQueries.js');

//<----------------------Per User---------------------->>

const updateOrCreateUserBots = function(botsArray) {
   return Promise.all(botsArray.map(botObj => updateOrCreateNewBot(botObj)));
};

const getAllUserBots = function(userId) {

  return new Promise((resolve, reject) => {
    dbq.getUserBots(userId)
      .then(botIdArray => {
        Promise.all(botIdArray.map(botId => getAllBotInfo(botId)))
          .then(botsArray => {
            console.log("bots array", botsArray);
            resolve(botsArray);
          }).catch(reject);
      });
  });

  // return new Promise((resolve, reject) => {
  //   dbq.getUserBots(userId)
  //     .then(botIdArray => Promise.all(botIdArray.map(botId => getAllBotInfo(botId))))
  //     .then(botsArray => {
  //       console.log("bots array", botsArray);
  //       resolve(botsArray);
  //     }).catch(reject);
  // });

};


//<----------------------Per Bot---------------------->>

const updateOrCreateNewBot = function(botObj) {
  if(botObj.id) {
    return updateAllBotInfo(botObj);
  } else {
    return createAllBotInfo(botObj);
  }
};

const createAllBotInfo = function(userId, botObj) {

  return new Promise((resolve, reject) => {
    dbq.addBotToUser(userId, botObj)
    .then(() => addOrUpdateSelectedContacts(botObj))
    .then(() => addOrUpdateTasks(botObj))
    .then(resolve)
    .catch(reject);
  });

};

const updateAllBotInfo = function(botObj) {

  return new Promise((resolve, reject) => {
    dbq.updateBot(botObj)
      .then(() => addOrUpdateSelectedContacts(botObj))
      .then(() => addOrUpdateTasks(botObj))
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
        console.log("array of db returns", arrayOfBotInfo);
        //massage data into botObj; 
        resolve(botObj)
      }).catch(resolve);
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
  if(taskObj.id) {
    return dbq.updateSelectedTask(taskObj);
  } else {
    return dbq.addToTasks(botId, taskObj);
  }
};


module.exports = {
    getAllBotInfo: getAllBotInfo,
    getAllUserBots: getAllUserBots,
    addOrUpdateContact: addOrUpdateContact,
    addOrUpdateSelectedContacts: addOrUpdateSelectedContacts,
    addOrUpdateRegisteredTasks: addOrUpdateRegisteredTasks,
}

