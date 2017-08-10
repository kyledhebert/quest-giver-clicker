import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameDashboardComponent } from './containers/game-dashboard/game-dashboard.component'

@NgModule({
    declarations: [
        GameDashboardComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        GameDashboardComponent
    ]
})
export class GameDashboardModule {}