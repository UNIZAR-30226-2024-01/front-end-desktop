import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TableroComponent } from '../app/game-page/tablero/tablero.component';
import { TurnoService } from '../app/servicios/servicio-turno/turno.service';
import { CommonModule } from '@angular/common';

describe('TableroComponent', () => {
  let component: TableroComponent;
  let fixture: ComponentFixture<TableroComponent>;

  const mockTurnoService = {
    parteTurno$: of('elegir-casilla')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: TurnoService, useValue: mockTurnoService }
      ],
      imports: [CommonModule],
      declarations: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle click on cell', () => {
    spyOn(component, 'handleClickOnCell');
    component.handleClickOnCell();
    expect(component.handleClickOnCell).toHaveBeenCalled();
  });
});