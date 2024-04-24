import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSelectionComponent } from '../app/game-page/character-selection/character-selection.component';

describe('CharacterSelectionComponent', () => {
  let component: CharacterSelectionComponent;
  let fixture: ComponentFixture<CharacterSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
