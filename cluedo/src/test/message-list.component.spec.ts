import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageComponent } from '../app/chat/message/message.component';
import { MessageListComponent } from '../app/chat/message-list/message-list.component';
import { LinkedList } from 'linked-list-typescript';
import { CommonModule } from '@angular/common';

describe('MessageListComponent', () => {
  let component: MessageListComponent;
  let fixture: ComponentFixture<MessageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind @Input property messages', () => {
    const messageComponent = new MessageComponent();
    const linkedList = new LinkedList<MessageComponent>();
    linkedList.append(messageComponent);

    component.messages = linkedList;

    fixture.detectChanges();

    expect(component.messages).toBe(linkedList);
  });
});