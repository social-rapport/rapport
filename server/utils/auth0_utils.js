const request = require('request');
const authDomain = process.env.AUTH0_DOMAIN || require('../../private_keys.js').AUTH0_DOMAIN;
const authClientId = process.env.AUTH0_CLIENT_ID || require('../../private_keys.js').AUTH0_CLIENT_ID;
const authClientSecret = process.env.AUTH0_CLIENT_SECRET || require('../../private_keys.js').AUTH0_CLIENT_SECRET;


//takes the JWT token passed from the auth0 login and handshakes to get the user object and returns the user id
function getUserIdFromToken (token) {
    const url = `http://${authDomain}/tokeninfo`;

   return new Promise((resolve, reject) =>{
        request.post(url, {json: {id_token: token}}, (error, response,body) => {
            if (error) {
                console.log=('error getting user object from token id ====> ', error);
                reject(error);
            }
            resolve(jsonChecker(body).user_id);
        });
   }); 
}

//handshakes to get the auth0 user access token
function getAccesstoken() {
    const requestParams = {
        method: 'POST',
        url: `https://${authPath.AUTH0_DOMAIN}/oauth/token`,
        headers: {'content-type': 'application/json'},
        body: `{
            "client_id":"${authClientId}",
            "client_Secret":"${authClientSecret}",
            "audience":"https://${authDomain}/api/v2",
            "grant_type":"client_credentials"
        }`
    };

    return new Promise((resolve, reject) => {
        request(requestParams, (error, response, body) => {
            if(error){
                console.log('error getting access token from auth0', error);
                reject(error);
            }
            resolve(jsonChecker(body).access_token);
        });
    });
}

//takes the access token and the user id and handshakes to get the user acces keys
//returns an array of IdP objects
function getUserAccessKeys(userId, accessToken) {
    const requestParams = {
        method: 'GET',
        url: `https://${authDomain}/api/v2/users/${userId}`,
        headers: {
            'content-type': 'application/json',
            'Authorization' : 'Bearer ' + accessToken
        }
    };

    return new Promise ((resolve, reject) => {
        request(requestParams, (error, response, body) => {
            if(error) {
                console.log('error getting IdP access tokens', error);
                reject(error);
            }
            resolve(jsonChecker(body).identities);
        });
    });
}

//filters the identities array and pulls out the FB access key
function getFbAccessKey(identitiesArray) {
    return identitiesArray.filter(IdPObj => IdPObj.provider === 'facebook')[0].access_token;
}

//checks for JSON and parses if it is json
function jsonChecker(itemToBeChecked) {
    return typeof itemToBeChecked === 'string' ? JSON.parse(itemToBeChecked) : itemToBeChecked;
}

module.exports = {
    getFbAccessKey: getFbAccessKey,
    getUserAccessKeys: getUserAccessKeys,
    getAccesstoken: getAccesstoken,
    getUserIdFromToken: getUserIdFromToken
};