import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GameDashboardComponent } from './containers/game-dashboard/game-dashboard.component';
import { GameNavigationComponent } from './components/game-navigation/game-navigation.component';
import { GameQuestComponent } from './components/game-quest/game-quest.component';
import { GameCraftComponent } from './components/game-craft/game-craft.component';
import { GameTradeComponent } from './components/game-trade/game-trade.component';
import { QuestCardComponent } from './components/quest-card/quest-card.component';

import { GameDashboardService } from './game-dashboard.service';

const routes: Routes = [
    { path: '', component: GameQuestComponent, pathMatch: 'full'},
    { path: 'trade', component: GameTradeComponent, pathMatch: 'full'},
    { path: 'craft', component: GameCraftComponent, pathMatch: 'full'}
];


@NgModule({
    declarations: [
        GameDashboardComponent,
        GameNavigationComponent,
        GameQuestComponent,
        GameCraftComponent,
        GameTradeComponent,
        QuestCardComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        GameDashboardComponent
    ],
    providers: [
        GameDashboardService
    ]
})
export class GameDashboardModule {}
