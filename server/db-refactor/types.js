
//<-----------------initialBots----------------->

var initialBots = 
    [{
        botId: null,
        botName: 'unnamed',
        botType: 'basic',
        tasks: [
            'sayHappyBirthdayGmail',
            'sayHappyBirthdayFacebook',
            'sayHiGmail',
            'sayHiFacebook'
        ],
        selectedContacts: [],
        botActivity:{
        recent:[],
        scheduled:[]
        }
    }];

var initialUser = {
    name: null, 
    gmail: null, 
    //gmailAuthToken: null, 
    //fbPassword: null, 
    fbUsername: null,
    newUser: true,
};

module.exports = {
    initialUser: initialUser,
    initialBots: initialBots,
}