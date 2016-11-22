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
  console.log("passed bot obj", botObj);
  if(botObj.id) {
    return updateAllBotInfo(botObj);
  } else {
    return createAllBotInfo(userId, botObj);
  }
};

const createAllBotInfo = function(userId, botObj) {

  return new Promise((resolve, reject) => {
    dbq.addBotToUser(userId, botObj)
    .then(botId => Promise.all([addOrUpdateSelectedContacts(botId, botObj.selectedContacts),
      addOrUpdateRegisteredTasks(botId, botObj.tasks), addOrUpdateSelectedFacebookFriends(botObj.id, botObj.selectedFbFriends)]))
    .then(resolve)
    .catch(reject);
  });
};

const updateAllBotInfo = function(botObj) {
  return new Promise((resolve, reject) => {
    dbq.updateBot(botObj)
      .then(affectedRows => Promise.all([addOrUpdateSelectedContacts(botObj.id, botObj.selectedContacts),
        addOrUpdateRegisteredTasks(botObj.botId, botObj.tasks), addOrUpdateSelectedFacebookFriends(botObj.id, botObj.selectedFbFriends)]))
      .then(resolve)
      .catch(reject);
  });
};

const getAllBotInfo = function(botId) {

  let botObj = {
    id: null,
    botType: null,
    botName: null,
    tasks: [],
    selectedContacts: [],
    selectedFbFriends: [],
    botActivity: {
      recent: [],
      scheduled: []
    }
  };

  return new Promise ((resolve, reject) => {
    Promise.all([dbq.getBot(botId),dbq.getSelectedContacts(botId), dbq.getSelectedTasks(botId), dbq.getSelectedFacebookFriends(botId)])
      .then(arrayOfBotInfo => {
        //massage data into botObj; 
        botObj.id = arrayOfBotInfo[0][0].id;
        botObj.botType = arrayOfBotInfo[0][0].botType;
        botObj.botName = arrayOfBotInfo[0][0].botName || arrayOfBotInfo[0][0].botType;
        botObj.selectedContacts = arrayOfBotInfo[1];
        botObj.tasks = arrayOfBotInfo[2];
        botObj.selectedFbFriends = arrayOfBotInfo[3];

        resolve(botObj)
      }).catch(reject);
  });
};


//<-----------------------COLLECTIONS----------------------->

//contacts
const addOrUpdateSelectedContacts = function (botId, contactArray) {
  return Promise.all(contactArray.map(contactObj => addOrUpdateContact(botId,contactObj)));
};

const addOrUpdateContact = function(botId, contactObj) {
  if(contactObj.id) {
    return dbq.updateSelectedContact(contactObj);
  } else {
    return dbq.addToSelectedContacts(botId, contactObj);
  }
};

const removeFromSelectedContacts = function (contactIdArray) {
  return Promise.all(contactIdArray.map(contactId => dbq.removeSelectedContact(contactId)));
}

//tasks
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

const removeFromRegisteredTasks = function(taskIdArray) {
  return Promise.all(taskIdArray.map(taskId => dbq.removeSelectedTask(taskId)));
};

//facebook friends
const addOrUpdateSelectedFacebookFriends = function(botId, friendArray) {
  return Promise.all(friendArray.map(friend => addOrUpdateFacebookFriend(botId, friend)));
}; 

const addOrUpdateFacebookFriend = function(botId, friendObj) {
  if(friendObj.id) {
    return dbq.updateSelectedFacebookFriend(friendObj);
  } else {
    return dbq.addToSelectedFacebookFriends(botId, friendObj);
  }
};

const removeFromSelectedFacebookFriends = function(friendIdArray) {
  return Promise.all(friendIdArray.map(friendId => dbq.removeFromSelectedFacebookFriends(friendId)));
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
    updateOrCreateNewBot: updateOrCreateNewBot,
    removeFromSelectedFacebookFriends: removeFromSelectedFacebookFriends,
    removeFromSelectedContacts: removeFromSelectedContacts, 
};

