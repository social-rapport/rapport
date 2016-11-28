var fbchat = require("facebook-chat-api");

module.exports = {

  getUserData: function(auth, user,callback){
    fbchat(auth, function callback (err, api) {
      if(err) return console.error(err);
      //Send Message to User - Note: Use vanity username for accuracy
      api.getUserID(user, function(err, data) {
          if(err) return callback(err);
          console.log('data', data);
          callback(data);
      });
    });
  },

  sendMsg: function(auth, user, msg,callback){
    console.log("passed auth obj", auth);
    fbchat(auth, function(err, api) {
      if(err) return console.error(err);
      //Send Message to User - Note: Use vanity username for accuracy
      api.getUserID(user, function(err, data) {
          if(err) return callback(err);
          // send the message to the best match (best by Facebook's criteria)
          var threadID = data[0].userID;
          api.sendMessage(msg, threadID, callback);
      });
    });
  },

  getFriendsList: function(auth){
    return new Promise((resolve,reject) => {
      fbchat(auth,(err, api) => {
        if(err) reject(err);
        api.getFriendsList((err, data) => {
          resolve(data);
        });
      });
    });
  }

};
