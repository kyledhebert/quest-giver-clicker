import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';

import { GameDashboardModule} from './game-dashboard/game-dashboard.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    GameDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
