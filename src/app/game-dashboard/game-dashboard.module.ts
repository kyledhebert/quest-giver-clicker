import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdGridListModule, MdButtonModule } from '@angular/material';

import { GameDashboardComponent } from './containers/game-dashboard/game-dashboard.component';
import { GameNavigationComponent } from './components/game-navigation/game-navigation.component';

@NgModule({
    declarations: [
        GameDashboardComponent,
        GameNavigationComponent
    ],
    imports: [
        CommonModule,
        MdGridListModule,
        MdButtonModule
    ],
    exports: [
        GameDashboardComponent,
        GameNavigationComponent
    ]
})
export class GameDashboardModule {}
