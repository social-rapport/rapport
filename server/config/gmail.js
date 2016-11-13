var google = require("googleapis");
var googleContacts = require('google-contacts-with-photos');

var OAuth2 = google.auth.OAuth2;
var scopes = [
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/contacts.readonly'
];

module.exports.oauth2Client = new OAuth2("1024197809488-g0ff71483dgei7eb6hkkp84ia59kchmo.apps.googleusercontent.com", "0e70zxgnHAHavEvTy7oDyeRS", "http://localhost:5050/server/config/static/oauthcallback");

module.exports.url = module.exports.oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

module.exports.sendUrl = function(req, res) {
  res.send(module.exports.url);
};

module.exports.getTokens = function(req, res) {
  var code = req.query.code;
  module.exports.oauth2Client.getToken(code, function(err, tokens) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    // console.log(tokens.access_token);
    module.exports.oauth2Client.setCredentials(tokens);
    module.exports.getContacts(req, res, tokens);
  });
};

module.exports.getContacts = function(req, res, tokens){
  var opts = {
    token: tokens.access_token
  };
  googleContacts(opts)
    .then(function (data) {
        console.log(data);
        res.send(data);
    })
    .catch(function (err) {
        console.log(err);
        res.end();
    });
};

module.exports.sendSampleMail = function(auth, cb) {
    var auth = module.exports.oauth2Client;
    var gmailClass = google.gmail('v1');
    var email_lines = [];
    email_lines.push('From: "Vi Vo" <vi.uyen.vo@gmail.com>');
    email_lines.push('To: vi.uyen.vo@gmail.com');
    email_lines.push('Content-type: text/html;charset=iso-8859-1');
    email_lines.push('MIME-Version: 1.0');
    email_lines.push('Subject: whooooot! this is from vi\'s app');
    email_lines.push('');
    email_lines.push('Hello there! How have you been?<br/>');

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
