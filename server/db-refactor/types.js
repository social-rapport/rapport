
//<-----------------initialBots----------------->

var initialBots = 
    [{
        botId: null,
        botName: 'unnamed',
        botType: 'basic',
        tasks: [
             { 
                id: null,
                date: 'today', 
                platform: 'gmail', 
                message: 'Howdy! how are ya!', 
                task: 'sayHiGmail'
            },
            { 
                id: null,
                date: 'today', 
                platform: 'gmail', 
                message: 'Happy Birthday!', 
                task: 'sayHappyBirthdayGmail'
            }
        ],
        selectedContacts: [],
        selectedFbFriends: [],
        botActivity:{
            recent:[],
            scheduled:[]
        }
    },
    {
        botId: null,
        botName: 'unnamed',
        botType: 'social',
        tasks: [
            { 
                id: null,
                date: 'today', 
                platform: 'facebook', 
                message: 'Howdy! how are ya!', 
                task: 'sayHiFacebook'
            },
            { 
                id: null,
                date: 'today', 
                platform: 'facebook', 
                message: 'Happy Birthday!', 
                task: 'sayHappyBirthdayFacebook'
            }
        ],
        selectedContacts: [],
        selectedFbFriends: [],
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