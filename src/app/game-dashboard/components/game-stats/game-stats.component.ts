import { Component, OnInit } from '@angular/core';

import { InventoryItem } from '../../models/inventory-item.interface';

import { GameDashboardService } from '../../game-dashboard.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent implements OnInit {

  inventoryItems: InventoryItem[];

  constructor(private service: GameDashboardService) { }

  ngOnInit() {
    this.inventoryItems = this.service.getInventory();
    console.log(this.inventoryItems);
  }

}
