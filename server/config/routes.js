// REQUIRE CONTROLLERS
// var exampleController = require('../example/exampleController.js');
var gmail = require('./gmailController.js');

module.exports = function (app, express) {

app.get('/',function(request, response){
  console.log('Server Alive');
  response.status(200).send('Server Alive');
});

// app.get
//app.get('/api/example', exampleController.exampleMethod);

  // app.post

// <--------------- GMAIL ROUTES --------------->
//FOR SIGNING INTO GOOGLE WITH OAUTH
app.get("/signInWithGoogle", function(req, res){
  res.sendFile(__dirname+'/static/gmailLogin.html');
});

//SENDS EMAIL
app.get("/sendMail", gmail.sendMail);

//GETS GMAIL CONTACTS
app.get("/contacts", gmail.getContacts);

//FOR GMAIL OAUTH, don't access directly
app.get("/tokens", gmail.getTokens);
app.get("/url", gmail.sendUrl);
app.get("/app",function(req,res){
  res.sendFile('index.html', {root: '../'})
})
app.get("/oauthcallback",function(req,res){
  res.sendFile('index.html', {root: '../'})
})
};