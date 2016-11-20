
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

module.exports = {
    getAllBotInfo: getAllBotInfo,
    getAllUserBots: getAllUserBots,
}