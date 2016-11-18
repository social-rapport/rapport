export class Bot {
  id: number;
  description: string;
  name: string;
  activities: Array<string>;
  contacts: Array<Object>;
  tasks: Array<string>;
}

class gmailContact {
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