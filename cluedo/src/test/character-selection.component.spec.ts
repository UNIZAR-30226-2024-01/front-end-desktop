/*import { ComponentFixture, TestBed } from '@angular/core/testing';

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
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterSelectionComponent } from '../app/game-page/character-selection/character-selection.component';
import { GameService } from '../app/servicios/servicio-game/game.service';
import { SocketService } from '../app/servicios/servicio-socket/socket.service';
import { CommonModule } from '@angular/common';

describe('CharacterSelectionComponent', () => {
  let component: CharacterSelectionComponent;
  let fixture: ComponentFixture<CharacterSelectionComponent>;
  let mockGameService:any;
  let mockSocketService;

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj(['getPersonaje']);
    mockSocketService = jasmine.createSpyObj(['getMessageObservable', 'chatMessage']);
    
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: SocketService, useValue: mockSocketService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if character is selected', () => {
    mockGameService.charactersSelected = [false, true, false];
    expect(component.isCharacterSelected(1)).toBe(true);
    expect(component.isCharacterSelected(0)).toBe(false);
  });
});