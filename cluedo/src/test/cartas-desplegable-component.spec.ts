import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartasDesplegableComponent } from '../app/cartas-desplegable/cartas-desplegable.component';
import { CommonModule } from '@angular/common';
describe('CartasDesplegableComponent', () => {
  let component: CartasDesplegableComponent;
  let fixture: ComponentFixture<CartasDesplegableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CommonModule],
      declarations: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartasDesplegableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle "desplegado" property', () => {
    expect(component.desplegado).toBeFalse();
    component.toggleDesplegado();
    expect(component.desplegado).toBeTrue();
    component.toggleDesplegado();
    expect(component.desplegado).toBeFalse();
  });

});