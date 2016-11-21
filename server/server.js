var sqp = require('./db-refactor/dbQueries')
var mysql = require('promise-mysql');

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dev',
    database: 'rapport'
}).then(function(conn,x){
    exportConn(conn);
}).catch(function(err){
    console.log(err);
});

function exportConn(conn){
    sqp.injectConnection(conn);
}

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static(__dirname+'/config/static'));
app.use(express.static(__dirname+'/../'));
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