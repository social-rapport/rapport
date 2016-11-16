// REQUIRE CONTROLLERS
// var exampleController = require('../example/exampleController.js');
var gmail = require('./gmailController.js');
const auth0Utils = require('../utils/auth0_utils.js');
var appController = require('./appController.js');
module.exports = function (app, express) {

  console.log("routes loaded");

  app.get('/',function(request, response){
    console.log('Server Alive');
    response.status(200).send('Server is alive!');
  });

  //route for handling sign in and sign up
  app.post('/signIn', appController.checkIfNewUser);


  // <--------------- BOT ROUTES --------------->
  app.put('/api/bots', appController.updateBots);

  app.get('/api/bots', appController.getBotInfo);

  app.get('/botTypes', appController.getBotTypes);


  // <--------------- GMAIL ROUTES --------------->
  //FOR SIGNING INTO GOOGLE WITH OAUTH
  app.get("/signInWithGoogle", function(req, res){
    res.sendFile(__dirname+'/static/gmailLogin.html');
  });

  //SENDS EMAIL
  app.get("/sendMail", gmail.sendMail);

  //GETS GMAIL CONTACTS
  app.get("/api/gmail/contacts", gmail.getContacts);

  //FOR GMAIL OAUTH, don't access directly
  app.get("/tokens", gmail.getTokens);

  app.get("/url", gmail.sendUrl);

  app.get("/app",function(req,res){
    res.sendFile('index.html', {root: '../'})
  });

  app.get("/oauthcallback",function(req,res){
    res.sendFile('index.html', {root: '../'})
  })
};


