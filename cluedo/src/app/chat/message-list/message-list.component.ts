import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { MessageComponent } from '../message/message.component'
import { SpecialMessage } from '../special-message/special-message.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageComponent, SpecialMessage],
  templateUrl: './message-list.component.html',
  styleUrl: '../../../../../../front-end-shared/css/Game/Chat/message-list.css'
})
export class MessageListComponent {
  @Input() messages: {type: string, username:string, text: string}[] = [];
  constructor() {}
}
