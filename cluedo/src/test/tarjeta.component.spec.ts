import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'; 
import { TarjetaComponent, EstadoCelda } from '../app/tarjeta/tarjeta.component';

describe('TarjetaComponent', () => {
  let component: TarjetaComponent;
  let fixture: ComponentFixture<TarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tabla with correct dimensions', () => {
    expect(component.tabla.length).toBe(21);
    expect(component.tabla[0].length).toBe(7);
  });

  it('should initialize all cells with EstadoCelda.INDEFINIDO', () => {
    for (let i = 0; i < component.numFilas; i++) {
      for (let j = 0; j < component.numColumnas; j++) {
        expect(component.tabla[i][j].estado).toBe(EstadoCelda.INDEFINIDO);
      }
    }
  });

  it('should toggle desplegado variable', () => {
    expect(component.desplegado).toBeFalse();
    component.toggleDesplegado();
    expect(component.desplegado).toBeTrue();
    component.toggleDesplegado();
    expect(component.desplegado).toBeFalse();
  });
});
