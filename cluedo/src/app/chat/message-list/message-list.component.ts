import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { MessageComponent } from '../message/message.component'
import { SpecialMessage } from '../special-message/special-message.component';
import { LinkedList } from 'linked-list-typescript';


@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageComponent, SpecialMessage],
  templateUrl: './message-list.component.html',
  styleUrl: '../../../../../../front-end-shared/css/Game/Chat/message-list.css'
})
export class MessageListComponent {
  @Input() messages!: LinkedList<MessageComponent>;
  constructor() {}
}
