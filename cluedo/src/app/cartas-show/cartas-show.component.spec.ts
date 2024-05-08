import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartasShowComponent } from './cartas-show.component';

describe('CartasShowComponent', () => {
  let component: CartasShowComponent;
  let fixture: ComponentFixture<CartasShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartasShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartasShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
