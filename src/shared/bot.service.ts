import { Injectable } from '@angular/core';

import { Bot } from '../shared/bot';
import { BOTS } from '../data/mock-bots';

@Injectable()
export class BotService {
  getBots(): Promise<Bot[]> {
    return Promise.resolve(BOTS);
  }

  getBot(id: number): Promise<Bot> {
    return this.getBots()
                .then(bots => bots.find(bot => bot.id === id));
    }
    

}
