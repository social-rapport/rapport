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
app.get("/signInWithGoogle", function(req, res){
  res.sendFile(__dirname+'/static/index.html');
});

app.get("/tokens", gmail.getTokens);

app.get("/url", gmail.sendUrl);

app.get("/contacts", gmail.getContacts);

app.get("/sendSampleMail", gmail.sendSampleMail);

};