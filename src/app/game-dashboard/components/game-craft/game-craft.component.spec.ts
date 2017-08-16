import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCraftComponent } from './game-craft.component';

describe('GameCraftComponent', () => {
  let component: GameCraftComponent;
  let fixture: ComponentFixture<GameCraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
