var express = require('express');
var app = express();
app.use(express.static('static'));
//-------------- DATABASE -------------------------


//------------- EXPRESS and MIDDLEWARE ----------------------
var middleware = require('./config/middleware.js');
middleware(app, express);

//------------- ROUTES ----------------------
var routes = require('./config/routes.js');
routes(app, express);

//-------------- Server Listening --------------------
app.listen(app.get('port'), function() {
  console.log('Listening on port', app.get('port'));
});

module.exports = app;