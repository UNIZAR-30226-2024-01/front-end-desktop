import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarruselComponent } from '../app/carrusel/carrusel.component';
import { CommonModule } from '@angular/common';
describe('CarruselComponent', () => {
  let component: CarruselComponent;
  let fixture: ComponentFixture<CarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
        declarations: [] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit product change', () => {
    spyOn(component.cartaElegida, 'emit');
    component.products = ['product1', 'product2', 'product3'];
    component.onProductChange({page: 1});
    expect(component.cartaElegida.emit).toHaveBeenCalledWith('product2');
  });
});