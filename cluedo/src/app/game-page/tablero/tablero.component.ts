import { Component } from '@angular/core';
import { CeldaComponent } from '../celda/celda.component';
import { CeldaType } from '../celda/celda-type.enum';

import * as infoTablero from '../../../assets/infoTablero.json';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CeldaComponent],
  templateUrl: './tablero.component.html',
  styleUrl: '../../../../../../front-end-shared/css/Game/Tablero/Tablero.css'
})

export class TableroComponent {
  numFilas: number = 24;
  numColumnas: number = 24;
  tablero: any[][] = [];
  datosTablero = infoTablero.infoTablero;

  constructor() { 
    // Ejemplo: Crear un tablero de 5x5 e inicializar cada celda
    for (let i = 0; i < this.numFilas; i++) {
      this.tablero[i] = [];
      for (let j = 0; j < this.numColumnas; j++) {
        this.tablero[i][j] = {
          isRoom: false,
          roomName: "",
          hasPlayer: false
        }; // Puedes inicializar las celdas como desees
      }
    }
    console.log(this.tablero);
  }
}
