import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageComponent } from '../app/chat/message/message.component';
import { CommonModule } from '@angular/common';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind @Input properties', () => {
    component.text = 'test message';
    component.username = 'test user';
    component.type = 'test type';
    component.character = 'test character';
    component.timestamp = 'test timestamp';

    fixture.detectChanges();

    expect(component.text).toBe('test message');
    expect(component.username).toBe('test user');
    expect(component.type).toBe('test type');
    expect(component.character).toBe('test character');
    expect(component.timestamp).toBe('test timestamp');
  });
});