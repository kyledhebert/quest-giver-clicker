import { Injectable } from '@angular/core';

import { Quest } from './models/quest.interface';

@Injectable()
export class GameDashboardService {

  activeQuests: Quest[] = [];
  completedQuests: Quest[] = [];

  constructor() {}

  getQuests(): Quest[] {
    return [
      {
        id: 1,
        name: 'Level One Quest',
        text: 'This is a level one quest',
        turnIn: 'rat tails',
        turnInQty: 10,
        completion: 50,
        giveButtonDisabled: false,
        rewardButtonDisabled: true
      },
      {
        id: 2,
        name: 'Level Two Quest',
        text: 'This is a level one quest',
        turnIn: 'rat tails',
        turnInQty: 10,
        completion: 0,
        giveButtonDisabled: false,
        rewardButtonDisabled: true
      },
      {
        id: 3,
        name: 'Level Three Quest',
        text: 'This is a level one quest',
        turnIn: 'rat tails',
        turnInQty: 10,
        completion: 0,
        giveButtonDisabled: false,
        rewardButtonDisabled: true
      },
      {
        id: 4,
        name: 'Level Three Quest',
        text: 'This is a level one quest',
        turnIn: 'rat tails',
        turnInQty: 10,
        completion: 0,
        giveButtonDisabled: false,
        rewardButtonDisabled: true
      }
    ];
  }

  giveQuest(quest: Quest) {
    console.log(quest);
    this.activeQuests.push(quest);
    console.log(this.activeQuests);
  }

  progressQuest() {
    this.activeQuests.forEach( quest => {
      if (quest.completion < 100) {
        quest.completion += (1 * 10);
        console.log(quest.completion);
      } else {
        quest.rewardButtonDisabled = false;
        this.activeQuests = this.activeQuests.filter(q => q.id !== quest.id);
        this.completedQuests.push(quest);
      }
    });
  }

}
