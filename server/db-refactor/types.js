
//<-----------------initialBots----------------->

var initialBots =
    [{
        botId: null,
        botName: 'MyBot',
        botType: 'basic',
        tasks: [
             {
                id: null,
                date: 'today',
                platform: 'gmail',
                message: 'Howdy! how are ya!',
                task: 'sayHiGmail',
                interval: 6
            },
            {
                id: null,
                date: 'today',
                platform: 'gmail',
                message: 'Happy Birthday!',
                task: 'sayHappyBirthdayGmail',
                interval: 12
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
        botName: 'MyBot',
        botType: 'social',
        tasks: [
            {
                id: null,
                date: 'today',
                platform: 'facebook',
                message: 'Howdy! how are ya!',
                task: 'sayHiFacebook',
                interval: 6
            },
            {
                id: null,
                date: 'today',
                platform: 'facebook',
                message: 'Happy Birthday!',
                task: 'sayHappyBirthdayFacebook',
                interval: 12
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
        botName: 'MyBot',
        botType: 'power',
        tasks: [
             {
                id: null,
                date: null,
                platform: 'gmail',
                message: 'Hope you\'re having a great holiday!',
                task: 'sayHappyHolidayGmail',
                interval: 12
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

const taskList = [
    {
        id: null,
        date: 'today',
        platform: 'facebook',
        message: 'Howdy! how are ya!',
        task: 'sayHiFacebook',
        interval: 6
    },
    {
        id: null,
        date: 'today',
        platform: 'facebook',
        message: 'Happy Birthday!',
        task: 'sayHappyBirthdayFacebook',
        interval: 12
    },
    {
        id: null,
        date: null,
        platform: 'facebook',
        message: 'Hope you\'re having a great holiday!',
        task: 'sayHappyHolidayFacebook',
        interval: 12
    },
    {
        id: null,
        date: 'today',
        platform: 'gmail',
        message: 'Howdy! how are ya!',
        task: 'sayHiGmail',
        interval: 6
    },
    {
        id: null,
        date: 'today',
        platform: 'gmail',
        message: 'Happy Birthday!',
        task: 'sayHappyBirthdayGmail',
        interval: 12
    },
    {
        id: null,
        date: null,
        platform: 'gmail',
        message: 'Hope you\'re having a great holiday!',
        task: 'sayHappyHolidayGmail',
        interval: 12
    }
];

module.exports = {
    initialUser: initialUser,
    initialBots: initialBots,
    taskList: taskList
}