import { Component } from '@angular/core';

@Component({
  selector: 'app-celda',
  standalone: true,
  imports: [],
  templateUrl: './celda.component.html',
  styleUrl: '../../../../../../front-end-shared/css/Game/Tablero/Celda.css'
})
export class CeldaComponent {
  isRoom: boolean = false;
  roomName: string = "";
  hasPlayer: boolean = false;
}
