import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartasComponent } from '../app/cartas/cartas.component';
import { GameItemsComponent } from '../app/game-items/game-items.component';
import { CommonModule } from '@angular/common';

describe('CartasComponent', () => {
  let component: CartasComponent;
  let fixture: ComponentFixture<CartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameItemsComponent, CommonModule],
      declarations:[]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hover to true by default', () => {
    expect(component.hover).toBeTrue();
  });
  it('should set player_name correctly', () => {
    component.player_name = 'Test Player';
    expect(component.player_name).toBe('Test Player');
  });

});