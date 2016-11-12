// REQUIRE CONTROLLERS
// var exampleController = require('../example/exampleController.js');
const auth0Utils = require('../utils/auth0_utils.js');
module.exports = function (app, express) {


app.get('/',function(request, response){
  console.log('Server Alive');
  response.status(200).send('Server Alive');
});

//route for handling sign in and sign up
app.get('/signing', (req, res) => {
  auth0Utils.getUserIdFromToken(req.body.id)
    .then(userId => console.log('successfully got user id', userId ));
});
// app.get
//app.get('/api/example', exampleController.exampleMethod);

  // app.post



};