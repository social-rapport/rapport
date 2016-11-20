var dbq = require('./dbQueries');

const getAllUserBots = function(userId) {

  return new Promise((resolve, reject) => {
    getUserBots(userId)
      .then(botIdArray => {
        let promisedArrayOfBots = botIdArray.map(botId => getAllBotInfo(botId));
        Promise.all(promisedArrayOfBots)
          .then(botsArray => {
            console.log("bots array", botsArray);
            resolve(botsArray);
          }).catch(reject);
      });
  });  
};

const getAllBotInfo = function(botId) {
  let botObj = {
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
    Promise.all([getBot(botId),getSelectedContacts(botId), getTasks(botId)])
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

//---tasks
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