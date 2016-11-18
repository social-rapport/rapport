import { customBot } from '../shared/custom-type-classes';
export const BOTS: customBot[] = [
  { botType: 'basic', 
    botActivity:{
      recent: ['said hi', 'said hello'],
      scheduled: []
    }, 
    selectedContacts: [{name: "John", email:"john@gmail.com", photo: ""},{name: "Jane", email:"john@gmail.com", photo: ""}],
    tasks: ['say hi'],
    },
];