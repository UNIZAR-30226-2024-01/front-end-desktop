import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'special-message',
  standalone: true,
  imports: [],
  templateUrl: './special-message.component.html',
  styleUrl: '../../../../../../front-end-shared/css/Chat/special-message.css'
})
export class SpecialMessage {
    who: string = "MrSoper";
    what: string = "cable de red";
    where: string = "cafeteria";
}