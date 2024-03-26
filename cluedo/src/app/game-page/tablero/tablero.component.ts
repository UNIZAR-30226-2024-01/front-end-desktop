import { Component } from '@angular/core';
import { CeldaComponent } from './celda/celda.component';
import { Celda } from './celda/celda.interface'; 
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
  tablero: Celda[][] = infoTablero.infoTablero;    // obtenemos la información del JSON infoTablero.json 

}
