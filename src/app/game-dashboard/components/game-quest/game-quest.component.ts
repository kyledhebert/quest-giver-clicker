import { Component, OnInit } from '@angular/core';

import { QuestCardComponent } from '../quest-card/quest-card.component';

import { Quest } from '../../models/quest.interface';

import { GameDashboardService } from '../../game-dashboard.service';

@Component({
  selector: 'app-game-quest',
  templateUrl: './game-quest.component.html',
  styleUrls: ['./game-quest.component.css']
})
export class GameQuestComponent implements OnInit {

  quests: Quest[];

  constructor(private gameService: GameDashboardService) { }

  ngOnInit() {
    this.quests = this.gameService.getQuests();
  }

  handleGive(event: Quest) {
    this.gameService.giveQuest(event);
  }

}
