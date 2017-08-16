import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MdGridListModule, MdButtonModule } from '@angular/material';

import { GameDashboardComponent } from './containers/game-dashboard/game-dashboard.component';
import { GameNavigationComponent } from './components/game-navigation/game-navigation.component';
import { GameQuestComponent } from './components/game-quest/game-quest.component';
import { GameCraftComponent } from './components/game-craft/game-craft.component';
import { GameTradeComponent } from './components/game-trade/game-trade.component';

const routes: Routes = [
    { path: '', component: GameQuestComponent, pathMatch: 'full'}
];


@NgModule({
    declarations: [
        GameDashboardComponent,
        GameNavigationComponent,
        GameQuestComponent,
        GameCraftComponent,
        GameTradeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
        MdGridListModule,
        MdButtonModule
    ],
    exports: [
        GameDashboardComponent
    ]
})
export class GameDashboardModule {}
