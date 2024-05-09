//9 test
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnoComponent } from '../app/turno/turno.component';
import { TurnoService } from '../app/servicios/servicio-turno/turno.service';
import { GameService } from '../app/servicios/servicio-game/game.service';
import { of } from 'rxjs';
import { CeldasService } from '../app/servicios/servicio-celdas/celdas.service'
import { CommonModule } from '@angular/common';

describe('TurnoComponent', () => {
  let component: TurnoComponent;
  let fixture: ComponentFixture<TurnoComponent>;
  let turnoService: TurnoService;
  let turnoComponent: TurnoComponent;
  let gameService: GameService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [],
      providers: [ 
        TurnoService, 
        CeldasService,
        TurnoComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoComponent);
    component = fixture.componentInstance;
    turnoService = TestBed.inject(TurnoService);
    turnoComponent = TestBed.inject(TurnoComponent);
    spyOn(turnoService, 'setParteTurno'); 
    fixture.detectChanges();  });
    

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set parteTurno on init', () => {
    expect(component.parteTurno).toBe('espera-resto');
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
    component.setCharacterSelected('mr SOPER');
    expect(component.characterSelected).toBe('mr SOPER');
  });

  it('should set gunSelected on setGunSelected', () => {
    component.setGunSelected('troyano');
    expect(component.gunSelected).toBe('troyano');
  });

  it('should set roomSelected on setRoomSelected', () => {
    component.setRoomSelected('aulasNorte');
    expect(component.roomSelected).toBe('aulasNorte');
  });
});