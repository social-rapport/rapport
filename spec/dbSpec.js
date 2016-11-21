var dbQ = require('../db-refactor/dbQueries.js');
var dbM = require('./dbModel.js');



var mysql = require('promise-mysql');

var connection;

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dev',
    database: 'rapport'
}).then(function(conn,x){
    dbQ.importConnection(conn);
    runTests(conn);
}).catch(function(err){
    console.log(err);
});

function log(data){
  console.log(data);
}

var contacts = [
    {
     email: 'a@b',
     name: 'John',
     photo: 'xyz',
    }
];

describe('user queries',function(){




});

describe('contact queries',function(){




// dbM.addOrUpdateSelectedContacts(1,[contactA1, contactB1])
// .then((arr)=>{
//   console.log(arr);
// })


});

describe('task queries',function(){




});


describe('bot queries',function(){




});