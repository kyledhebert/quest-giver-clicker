import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTradeComponent } from './game-trade.component';

describe('GameTradeComponent', () => {
  let component: GameTradeComponent;
  let fixture: ComponentFixture<GameTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
