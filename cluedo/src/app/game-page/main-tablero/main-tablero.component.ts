import { Component } from '@angular/core';
import { TableroComponent } from '../tablero/tablero.component';
import { PlayerInTableroComponent } from '../player-in-tablero/player-in-tablero.component';

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

}
