//9 test
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnoComponent } from '../app/turno/turno.component';
import { TurnoService } from '../app/servicios/servicio-turno/turno.service';
import { GameService } from '../app/servicios/servicio-game/game.service';
import { of } from 'rxjs';

describe('TurnoComponent', () => {
  let component: TurnoComponent;
  let fixture: ComponentFixture<TurnoComponent>;
  let turnoService: TurnoService;
  let gameService: GameService;

  beforeEach(async () => {
    const turnoServiceMock = {
      parteTurno$: of('test'),
      setParteTurno: jasmine.createSpy('setParteTurno')
    };

    const gameServiceMock = {};

    await TestBed.configureTestingModule({
      providers: [ 
        { provide: TurnoService, useValue: turnoServiceMock },
        { provide: GameService, useValue: gameServiceMock }
      ]
    })
    .compileComponents();
    turnoService = TestBed.inject(TurnoService);
    gameService = TestBed.inject(GameService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set parteTurno on init', () => {
    expect(component.parteTurno).toBe('test');
  });

  it('should call setParteTurno with "espera-resto" on handleClick', () => {
    component.handleClick();
    expect(turnoService.setParteTurno).toHaveBeenCalledWith('espera-resto');
  });

  it('should call setParteTurno with "es-tu-turno" on vaAserTuTurno', () => {
    component.vaAserTuTurno();
    expect(turnoService.setParteTurno).toHaveBeenCalledWith('es-tu-turno');
  });

  it('should call setParteTurno with "dados" on temporizadorDados', () => {
    component.temporizadorDados();
    expect(turnoService.setParteTurno).toHaveBeenCalledWith('dados');
  });

  it('should set characterSelected on setCharacterSelected', () => {
    component.setCharacterSelected('test');
    expect(component.characterSelected).toBe('test');
  });

  it('should set gunSelected on setGunSelected', () => {
    component.setGunSelected('test');
    expect(component.gunSelected).toBe('test');
  });

  it('should set roomSelected on setRoomSelected', () => {
    component.setRoomSelected('test');
    expect(component.roomSelected).toBe('test');
  });
});