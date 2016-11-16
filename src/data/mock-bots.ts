import { Bot } from '../shared/bot';
export const BOTS: Bot[] = [
  { id: 0, 
    description: 'keeps it real',
    name: 'Default', 
    activities: ['said hi', 'said hello'], 
    contacts: [{name: "John", birthday:"8/88/8888", active: false},
                {name: "Jane", birthday:"9/9/9999", active: false}
                ],
    tasks: ['say hi'],
    },
];