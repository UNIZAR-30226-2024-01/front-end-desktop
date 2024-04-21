import { Component, Input } from '@angular/core';
import { TableroComponent } from '../tablero/tablero.component';
import { PlayerInTableroComponent } from '../player-in-tablero/player-in-tablero.component';
import { SocketService } from '../../servicios/servicio-socket/socket.service';
import { GameService } from '../../servicios/servicio-game/game.service';

@Component({
  selector: 'app-main-tablero',
  standalone: true,
  imports: [TableroComponent,
            PlayerInTableroComponent  
          ],
  templateUrl: './main-tablero.component.html',
  styleUrl: '../../../../../../front-end-shared/css/Game/Tablero/MainTablero.css'
})
export class MainTableroComponent {
  @Input() personajes: string[] = []; 

  constructor(private socketService: SocketService, public gameservice: GameService) {}

  ngOnInit() {
  }
}
