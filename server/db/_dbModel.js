var dbModel = require('./dbModel');

function deleteBot(userId,botName,callback){
    dbModel.bot.botId(userId,botName, function(botId){
      dbModel.bot.deleteById(botId[0].id,callback);
    });
};

module.exports = {
  deleteBot: deleteBot
}