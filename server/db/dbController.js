var models = require('./dbModel');

module.exports = {
  users: {
    get: function (req, res) {
      models.users.get(function(err, users) {
        if (err) { throw err; }
        res.json(users);
      });
    },
    post: function (req, res) {
      var params = [req.body.userName];
      models.users.post(params, function(err, data) {
        if (err) { throw err; }
        res.sendStatus(201);
      });
    },
    getBots: function(req, res){
      //get all the bot identifiers for the user
        //get all the contact info for the bot
          //
    }
  },
  gmail: {
    get: function (req, res) {
      models.gmail.get(function(err, gmails) {
        if (err) { throw err; }
        res.json(gmails);
      });
    },
    post: function (req, res) {
      var params = [req.body.gmail];
      models.gmail.post(params, function(err, data) {
        if (err) { throw err; }
        res.sendStatus(201);
      });
    }
  },


}