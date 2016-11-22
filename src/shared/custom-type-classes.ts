export class gmailContact {
    email: string;
    name: string;
    photo: string;
}

class BotActivity {
  recent: Array<any>;
  scheduled: Array<any>;
}

export class customBot {
  id: Number;
  botType: string;
  tasks: Array<string>;
  selectedContacts: Array<gmailContact>;
  selectedFbFriends: Array<Object>;
  botActivity: BotActivity;
}