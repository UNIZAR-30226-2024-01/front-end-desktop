import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplegableComponent } from '../app/desplegable/desplegable.component';
import { CommonModule } from '@angular/common';
describe('DesplegableComponent', () => {
  let component: DesplegableComponent;
  let fixture: ComponentFixture<DesplegableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableComponent);
    component = fixture.componentInstance;
    component.componentePadre = 'chat'; 
    fixture.detectChanges();
  });

  it('should create', () => {
    component.componentePadre = 'chat';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  
  it('should bind @Input property componentePadre', () => {
    component.componentePadre = 'tarjeta';
    fixture.detectChanges();
    expect(component.componentePadre).toBe('tarjeta');
  });
  
  it('should handle click', () => {
    component.componentePadre = 'chat';
    fixture.detectChanges();
    spyOn(component.desplegableClicked, 'emit');
    component.handleClick();
    expect(component.desplegado).toBe(true);
    expect(component.desplegableClicked.emit).toHaveBeenCalled();
  });
  
  it('should get path D', () => {
    component.componentePadre = 'chat';
    component.desplegado = false;
    fixture.detectChanges();
    expect(component.getPathD()).toBe("M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3");
  });
});