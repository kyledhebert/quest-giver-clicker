import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdGridListModule, MdButtonModule } from '@angular/material';

import { GameDashboardComponent } from './containers/game-dashboard/game-dashboard.component';

@NgModule({
    declarations: [
        GameDashboardComponent
    ],
    imports: [
        CommonModule,
        MdGridListModule,
        MdButtonModule
    ],
    exports: [
        GameDashboardComponent
    ]
})
export class GameDashboardModule {}