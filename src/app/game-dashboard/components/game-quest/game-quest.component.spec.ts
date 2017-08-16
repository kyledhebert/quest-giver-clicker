import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameQuestComponent } from './game-quest.component';

describe('GameQuestComponent', () => {
  let component: GameQuestComponent;
  let fixture: ComponentFixture<GameQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
