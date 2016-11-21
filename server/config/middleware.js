var bodyParser = require('body-parser');
const authUtils = require('../utils/auth0_utils.js');

module.exports = function(app, express){
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.use((req,res,next) => {
    console.log(`${req.method} AT ${req.url}`);
    next();
  });
  app.set('port', (process.env.PORT || 5050));
  
  
}