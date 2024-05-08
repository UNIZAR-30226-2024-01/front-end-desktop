import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodasCartasComponent } from './todas-cartas.component';

describe('TodasCartasComponent', () => {
  let component: TodasCartasComponent;
  let fixture: ComponentFixture<TodasCartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodasCartasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodasCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
