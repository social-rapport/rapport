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
  botType: string;
  tasks: Array<string>;
  selectedContacts: Array<gmailContact>;
  botActivity: BotActivity;
}