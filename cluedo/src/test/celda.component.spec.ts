import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CeldaComponent } from '../app/game-page/tablero/celda/celda.component';
import { TurnoService } from '../app/servicios/servicio-turno/turno.service';
import { GameService } from '../app/servicios/servicio-game/game.service';
import { CeldasService } from '../app/servicios/servicio-celdas/celdas.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('CeldaComponent', () => {
  let component: CeldaComponent;
  let fixture: ComponentFixture<CeldaComponent>;
  let mockTurnoService;
  let mockGameService;
  let mockCeldasService;

  let gameService: GameService;
  let turnoService: TurnoService;
  let celdasService: CeldasService;

  
  beforeEach(async () => {
    mockTurnoService = jasmine.createSpyObj(['parteTurno$']);
    mockGameService = jasmine.createSpyObj(['personajes']);
    mockCeldasService = jasmine.createSpyObj(['playerPositions$', 'celdasOptions$']);

    mockTurnoService.parteTurno$ = of('test');
    mockGameService.personajes = ['mr SOPER', 'miss REDES'];
    mockCeldasService.playerPositions$ = of([1, 2, 3]);
    mockCeldasService.celdasOptions$ = of([true, false, true]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [
        { provide: TurnoService, useValue: mockTurnoService },
        { provide: GameService, useValue: mockGameService },
        { provide: CeldasService, useValue: mockCeldasService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeldaComponent);
    component = fixture.componentInstance;
    component.propiedadesCelda = {
      isRoom: false,
      roomName: 'testRoom',
      isWalkable: true,
      isDoor: false,
      isStartingCell: false,
      idx: 0
    }; 
    gameService = TestBed.inject(GameService);
    turnoService = TestBed.inject(TurnoService);
    celdasService = TestBed.inject(CeldasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject services', () => {
    expect(gameService).toBeTruthy();
    expect(turnoService).toBeTruthy();
    expect(celdasService).toBeTruthy();
  });

  it('should return correct color for player', () => {
    expect(component.player2color('mr SOPER')).toBe('#80b37e');
    expect(component.player2color('miss REDES')).toBe('#fcfd7f');
    expect(component.player2color('unknown')).toBe('black');
  });

});