// REQUIRE CONTROLLERS
// var exampleController = require('../example/exampleController.js');
module.exports = function (app, express) {


app.get('/',function(request, response){
  console.log('Server Alive');
  response.status(200).send('Server Alive');
});

// app.get
//app.get('/api/example', exampleController.exampleMethod);

  // app.post



};