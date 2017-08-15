import { Component, OnInit } from '@angular/core';


interface NavButton {
    name: string;
}

@Component({
    selector: 'app-game-navigation',
    templateUrl: './game-navigation.component.html',
    styleUrls: ['./game-navigation.component.css']
})
export class GameNavigationComponent implements OnInit {

    navButtons: NavButton[] = [
        { name: 'Quests' },
        { name: 'Crafting' },
        { name: 'Trading' }
    ];

    constructor() { }

    ngOnInit() {}
}
