import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameNavigationComponent } from './game-navigation.component';

describe('GameNavigationComponent', () => {
  let component: GameNavigationComponent;
  let fixture: ComponentFixture<GameNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
