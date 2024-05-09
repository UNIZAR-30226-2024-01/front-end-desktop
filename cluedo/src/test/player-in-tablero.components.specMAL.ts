import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerInTableroComponent } from '../app/game-page/player-in-tablero/player-in-tablero.component';
import { CommonModule } from '@angular/common';
import { distinctUntilKeyChanged } from 'rxjs';

describe('PlayerInTableroComponent', () => {
  let component: PlayerInTableroComponent;
  let fixture: ComponentFixture<PlayerInTableroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct color for personaje "mr SOPER"', () => {
    component.personaje = 'mr SOPER';
    expect(component.getColor()).toEqual('#80b37e');
  });

  it('should return correct image path for personaje "mr SOPER"', () => {
    component.personaje = 'mr SOPER';
    expect(component.getRutaImagen()).toEqual('../../../assets/images/personajes_imagen/png/MrSoper.png');
  });

  it('should return correct style for lado "left"', () => {
    component.lado = 'left';
    expect(component.getSyle()).toEqual('player left');
  });

  it('should return correct username or default', () => {
    component.username = '';
    expect(component.mostrarUsername()).toEqual('...');
    component.username = 'testUser';
    expect(component.mostrarUsername()).toEqual('testUser');
  });

  
});