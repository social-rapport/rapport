var bot = require('../bot/botController.js');
var CronJob = require('cron').CronJob;

module.exports.runCron = function(){
  new CronJob('* * * * * *', function() {
    console.log('Running Tasks');
    bot.runAllTasks(bot.logTasks);
  }, null, true, 'America/Los_Angeles');
};