import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Quest } from '../../models/quest.interface';

@Component({
  selector: 'app-quest-card',
  templateUrl: './quest-card.component.html',
  styleUrls: ['./quest-card.component.css']
})
export class QuestCardComponent implements OnInit {

  @Input()
  quest: Quest;

  @Output()
  give: EventEmitter<Quest> = new EventEmitter();


  constructor() { }

  ngOnInit() {}

  onGive() {
    console.log('giving quest');
    this.quest.giveButtonDisabled = true;
    this.give.emit(this.quest);
  }

}
