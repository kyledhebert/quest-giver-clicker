import { Component, OnInit, OnDestroy } from '@angular/core';

import { QuestCardComponent } from '../quest-card/quest-card.component';

import { Quest } from '../../models/quest.interface';

import { GameDashboardService } from '../../game-dashboard.service';

@Component({
  selector: 'app-game-quest',
  templateUrl: './game-quest.component.html',
  styleUrls: ['./game-quest.component.css']
})
export class GameQuestComponent implements OnInit, OnDestroy {

  quests: Quest[];

  constructor(private gameService: GameDashboardService) { }

  ngOnInit() {
    this.quests = this.gameService.getQuests();
  }

  ngOnDestroy() {
    this.gameService.saveQuests(this.quests);
  }

  handleGive(event: Quest) {
    this.gameService.giveQuest(event);
  }

  handleReward(event: Quest) {
    this.gameService.rewardQuest(event);
  }

}
