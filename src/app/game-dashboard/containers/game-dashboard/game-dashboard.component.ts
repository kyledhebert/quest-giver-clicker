import { Component, OnInit } from '@angular/core';

import { GameDashboardService } from '../../game-dashboard.service';

@Component({
    selector: 'app-game-dashboard',
    styleUrls: ['game-dashboard.component.css'],
    templateUrl: './game-dashboard.component.html'
})
export class GameDashboardComponent implements OnInit {

    constructor(private service: GameDashboardService) {}
    ngOnInit() {
        setInterval(() => {
            this.service.progressQuest();
        }, 1000);
    }
}
