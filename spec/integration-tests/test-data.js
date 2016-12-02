//<-----------------initialBots----------------->

var mockBots =
    [
    //no custom messages
    {
        botId: null,
        botName: 'chuck testa 1',
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
    //has custom messages and names
    {
        botId: null,
        botName: 'chuck testa 2',
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
    }
    ];

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

const mockFbFriends = [
    {
        id: null,
        name: 'chuck testing',
        vanityName: 'chuck.testa',
        birthday: 'sometime',
    },
    {
        id: null,
        name: 'chuck testing 1',
        vanityName: 'chuck.testa1',
        birthday: 'sometime',
    },
    {
        id: null,
        name: 'chuck testing2',
        vanityName: 'chuck.testa2',
        birthday: 'sometime',
    },
    {
        id: null,
        name: 'chuck testing3',
        vanityName: 'chuck.testa3',
        birthday: 'sometime',
    }
];

const mockGmailContacts = [
    {
        name: 'chuck testing',
        email: 'chuck@testa.com',
        birthday: 'sometime'
    },
    {
        name: 'chuck testing1',
        email: 'chuck@testa.com1',
        birthday: 'sometime'
    },
    {
        name: 'chuck testing2',
        email: 'chuck@testa.com2',
        birthday: 'sometime'
    },
    {
        name: 'chuck testing3',
        email: 'chuck@testa.com3',
        birthday: 'sometime'
    }
];

module.exports = {
    taskList: taskList,
    mockBots: mockBots,
    mockFbFriends: mockFbFriends,
    mockGmailContacts: mockGmailContacts
}