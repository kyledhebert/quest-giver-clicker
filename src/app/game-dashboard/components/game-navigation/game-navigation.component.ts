import { Component, OnInit } from '@angular/core';


interface NavButton {
    link: string;
    name: string;
    exact: boolean;
}

@Component({
    selector: 'app-game-navigation',
    styleUrls: ['./game-navigation.component.css'],
    template: `
    <nav>
        <button md-button
        *ngFor="let button of navButtons"
        [routerLink]="button.link"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: button.exact }">{{ button.name }}</button>
    </nav>
    `
})
export class GameNavigationComponent implements OnInit {

    navButtons: NavButton[] = [
        { link: '/', name: 'Quests', exact: true },
        { link: '/trade', name: 'Trading', exact: false },
        { link: '/craft', name: 'Crafting', exact: false },
    ];

    constructor() { }

    ngOnInit() {}
}
