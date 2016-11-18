//VARS NEEDED
var google = require("googleapis");
var googleContacts = require('google-contacts-with-photos');
var gmailKeys = require('./gmailKeys.js');
var auth = require('../utils/auth0_utils.js');
var appController = require('./appController.js');

// BASIC OAUTH SETUP
var OAuth2 = google.auth.OAuth2;
var scopes = [
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/contacts.readonly'
];

module.exports.oauth2Client = new OAuth2(gmailKeys.clientId, gmailKeys.clientSecret, "http://localhost:5050/oauthcallback");

module.exports.url = module.exports.oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

module.exports.emailInfoFromToken = function(token, next){
  auth.getUserIdFromToken(token)
      .then(userId => {
        auth.getAccesstoken()
          .then(accessToken => {
            auth.getUserAccessKeys(userId, accessToken)
              .then(userObj => {
                console.log("local gmail info",auth.getGmailInfo(userObj));
                var gmailInfo = auth.getGmailInfo(userObj);
                next(gmailInfo);
              })
          })
      })
};

module.exports.tokens = auth.gmailInfo;

//BEGIN METHODS
module.exports.sendUrl = function(req, res) {
  console.log('the gmail url',module.exports.url);
  res.send(module.exports.url);
};

module.exports.getTokens = function(req, res) {
  var code = req.query.code;
  console.log('getting tokens');
  module.exports.oauth2Client.getToken(code, function(err, tokens) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    console.log(tokens.access_token);
    module.exports.tokens = tokens;
    module.exports.oauth2Client.setCredentials(tokens);
    // module.exports.getContacts(req, res, tokens);
  });
};

//not being used
module.exports.getContactsWithAuth = function(authobj){
  var opts = {
    token: authobj.oauth
  };
  console.log('options is ', opts);
  googleContacts(opts)
    .then(function (data) {
        console.log(data);
        // res.send(data);
    })
    .catch(function (err) {
        console.log(err);
        // res.end();
    });
};

module.exports.getContacts = function(req, res){
  1;
  module.exports.emailInfoFromToken(req.query.token,function(userObj){
     googleContacts({token: userObj.oauth})
    .then(function (data) {
        res.send(data);
    })
    .catch(function (err) {
        console.log(err);
        res.end();
    });
  });
 
};

module.exports.getContactsFromAuth = function(userObj) {
  const opts = {
    token: userObj.oauth
  };

  googleContacts(opts)
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err){
      console.log(err);
    });
}

module.exports.sendMail = function(req, res){
  module.exports.oauth2Client.credentials.access_token = appController.oauth;
  module.exports.configureMail(module.exports.oauth2Client, function(err, results) {
    if(err){
      console.log('error ', err);
      res.send(err);
    } else {
      console.log(results);
      res.send(results);
    }
  });
};

//takes a oauth token and an object, with params, name, email,recipientEmail, subject and message
module.exports.configureMail = function(auth, cb, emailObj) {
    console.log('emailObj', emailObj);
    console.log("auth", auth);

    var gmailClass = google.gmail('v1');
    var email_lines = [];

    if(!emailObj) {
      email_lines.push('From: "Vi Vo" <vi.uyen.vo@gmail.com>');
      email_lines.push('To: vi.uyen.vo@gmail.com');
      email_lines.push('Content-type: text/html;charset=iso-8859-1');
      email_lines.push('MIME-Version: 1.0');
      email_lines.push('Subject: whooooot! this is from vi\'s app');
      email_lines.push('');
      email_lines.push('Hello there! How have you been?<br/>');

    } else {
      email_lines.push(`From: "${emailObj.name}" <${emailObj.email}>`);
      email_lines.push(`To: ${emailObj.recipientEmail}`);
      email_lines.push(`Content-type: text/html;charset=iso-8859-1`);
      email_lines.push(`MIME-Version: 1.0`);
      email_lines.push(`Subject: ${emailObj.subject}`);
      email_lines.push(``);
      email_lines.push(`${emailObj.message}<br/>`);

    }

    var email = email_lines.join('\r\n').trim();
    var base64EncodedEmail = new Buffer(email).toString('base64');
    base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

    gmailClass.users.messages.send({
        auth: auth,
        userId: 'me',
        resource: {
          raw: base64EncodedEmail
        }
      }, cb);

  };


// for the bot
//Test For Send MailBot
module.exports.sendMailBot = function(msgData, oauth,callback){
  console.log('oauth', oauth);
  module.exports.oauth2Client.credentials.access_token = oauth;
  module.exports.configureMailBot(msgData,module.exports.oauth2Client, function(err, results) {
    if(err){
      console.log('error ', err);
      callback(err);
    } else {
      console.log(results);
      callback(results);
    }
  });
};
module.exports.configureMailBot = function(msgData, auth, cb) {
    var gmailClass = google.gmail('v1');
    var email_lines = [];
    email_lines.push('From: ' + msgData.username + '<' +msgData.useremail+ '>');
    email_lines.push('To: '+ msgData.emailTo);
    email_lines.push('Content-type: text/html;charset=iso-8859-1');
    email_lines.push('MIME-Version: 1.0');
    email_lines.push('Subject: ' + msgData.subject);
    email_lines.push('');
    email_lines.push(msgData.body);

    var email = email_lines.join('\r\n').trim();
    var base64EncodedEmail = new Buffer(email).toString('base64');
    base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');
    gmailClass.users.messages.send({
      auth: auth,
      userId: 'me',
      resource: {
        raw: base64EncodedEmail
      }
    }, cb);
  };
