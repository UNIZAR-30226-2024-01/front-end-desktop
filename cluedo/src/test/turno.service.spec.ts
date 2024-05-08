import { TestBed } from '@angular/core/testing';
import { TurnoService } from '../app/servicios/servicio-turno/turno.service';

describe('TurnoService', () => {
  let service: TurnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get turno owner correctly', () => {
    const testOwner = 'testOwner';
    service.setTurnoOwner(testOwner);
    expect(service.getTurnoOwner()).toBe(testOwner);
  });

  it('should set parte turno correctly', (done: DoneFn) => {
    const testParteTurno = 'testParteTurno';
    service.setParteTurno(testParteTurno);
    service.parteTurno$.subscribe(value => {
      expect(value).toBe(testParteTurno);
      done();
    });
  });

  it('should set dados correctly', (done: DoneFn) => {
    const testDados = 5;
    service.setDados(testDados);
    service.dados$.subscribe(value => {
      expect(value).toBe(testDados);
      done();
    });
  });

  it('should restart turno correctly', (done: DoneFn) => {
    service.restartTurno();
    service.turnoOwner$.subscribe(value => {
      expect(value).toBe('');
    });
    service.parteTurno$.subscribe(value => {
      expect(value).toBe('espera-resto');
    });
    service.dados$.subscribe(value => {
      expect(value).toBeUndefined();
      done();
    });
  });
});