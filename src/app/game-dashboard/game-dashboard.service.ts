import { Injectable } from '@angular/core';

import { Quest } from './models/quest.interface';
import { InventoryItem } from './models/inventory-item.interface';

@Injectable()
export class GameDashboardService {

  inventory: InventoryItem[] = [
    {id: 1, name: 'Rat Tails', qty: 0, basePrice: 1},
    {id: 2, name: 'Goblin Ears', qty: 0, basePrice: 2},
    {id: 3, name: 'Kobold Candles', qty: 0, basePrice: 3}
  ];

  quests: Quest[] = [
    {
      id: 1,
      name: 'Level One Quest',
      text: 'This is a level one quest',
      turnIn: 'rat tails',
      turnInQty: 10,
      completion: 50,
      giveButtonDisabled: false,
      rewardButtonDisabled: true,
      isActive: false,
      isComplete: false
    },
    {
      id: 2,
      name: 'Level Two Quest',
      text: 'This is a level one quest',
      turnIn: 'rat tails',
      turnInQty: 10,
      completion: 0,
      giveButtonDisabled: false,
      rewardButtonDisabled: true,
      isActive: false,
      isComplete: false
    },
    {
      id: 3,
      name: 'Level Three Quest',
      text: 'This is a level one quest',
      turnIn: 'rat tails',
      turnInQty: 10,
      completion: 0,
      giveButtonDisabled: false,
      rewardButtonDisabled: true,
      isActive: false,
      isComplete: false
    },
    {
      id: 4,
      name: 'Level Three Quest',
      text: 'This is a level one quest',
      turnIn: 'rat tails',
      turnInQty: 10,
      completion: 0,
      giveButtonDisabled: false,
      rewardButtonDisabled: true,
      isActive: false,
      isComplete: false
    }
  ];



  activeQuests: Quest[] = [];
  completedQuests: Quest[] = [];

  constructor() {}

  getQuests(): Quest[] {
    console.log(this.quests);
    return this.quests;
  }

  saveQuests(quests: Quest[]) {
    this.quests = quests;
  }

  giveQuest(quest: Quest) {
    quest.giveButtonDisabled = true;
    quest.isActive = true;
  }

  progressQuest() {
    this.quests.forEach(quest => {
      if ((quest.isActive) && quest.completion < 100) {
        quest.completion += (1 * 10);
      } else if (quest.completion === 100) {
        quest.rewardButtonDisabled = false;
        quest.isComplete = true;
        quest.isActive = false;
      }
    });
  }

  rewardQuest(quest: Quest) {
    quest.rewardButtonDisabled = true;
    quest.giveButtonDisabled = false;
    quest.completion = 0;
    quest.isComplete = false;
    this.updateInventory(quest);
  }

  updateInventory(quest: Quest) {
    const item = this.inventory.find(i => i.name.toLocaleLowerCase === quest.turnIn.toLocaleLowerCase);
    item.qty += quest.turnInQty;
  }
}
