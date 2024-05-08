import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialMessage } from '../app/chat/special-message/special-message.component';
import { CommonModule } from '@angular/common';
describe('SpecialMessage', () => {
  let component: SpecialMessage;
  let fixture: ComponentFixture<SpecialMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties', () => {
    expect(component.who).toBe('MrSoper');
    expect(component.what).toBe('cable de red');
    expect(component.where).toBe('cafeteria');
  });
});