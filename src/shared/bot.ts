export class Bot {
  id: number;
  description: string;
  name: string;
  activities: Array<string>;
  contacts: Array<Object>;
  tasks: Array<string>;
}

class BotActivity {
  recent: Array<any>;
  scheduled: Array<any>;
}

class customBot {
  botType: string;
  tasks: Array<string>;
  selectedContacts: Array<Object>;
  botActivity: BotActivity;
}