import { Component, OnInit } from '@angular/core';


interface NavItem {
    link: string;
    name: string;
    exact: boolean;
}

@Component({
    selector: 'app-game-navigation',
    styleUrls: ['./game-navigation.component.css'],
    template: `
    <ul class="nav nav-pills">
        <li class="nav-item" *ngFor="let item of navItems">
            <a class="nav-link"
             [href]="item.link"
             [routerLink]="item.link"
             routerLinkActive="active"
             [routerLinkActiveOptions]="{ exact: item.exact }">
             {{ item.name }}</a>
        </li>
    </ul>
    `
})
export class GameNavigationComponent implements OnInit {

    navItems: NavItem[] = [
        { link: '/', name: 'Quests', exact: true },
        { link: '/trade', name: 'Trading', exact: false },
        { link: '/craft', name: 'Crafting', exact: false },
    ];

    constructor() { }

    ngOnInit() {}
}
