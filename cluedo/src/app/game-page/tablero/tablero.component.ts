import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CeldaComponent } from './celda/celda.component';
import { TextComponent } from './text/text.component';
import { Celda } from './celda/celda.interface'; 
import { TurnoService } from '../../servicios/servicio-turno/turno.service';
import * as infoTablero from '../../../assets/infoTablero.json';
@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CeldaComponent, TextComponent,CommonModule],
  templateUrl: './tablero.component.html',
  styleUrl: '../../../../../../front-end-shared/css/Game/Tablero/Tablero.css'
})

export class TableroComponent {
  numFilas: number = 24;
  numColumnas: number = 24;
  tablero: Celda[][] = infoTablero.infoTablero;    // obtenemos la información del JSON infoTablero.json 
  habitaciones: any = infoTablero.infoHabitaciones;
  parteTurno: string | undefined;

  constructor(private turnoService: TurnoService) {
    this.turnoService.parteTurno$.subscribe(parteTurno => {
      this.parteTurno = parteTurno;
     });
  }
  
  handleClickOnCell() {
    if ( this.parteTurno === 'elegir-casilla') {
      // const player_idx = usernames.indexOf(cookies.username);
  
  
      // setCeldasOptions(Array(24 * 24).fill(false));
      // setPlayerPositions((prev) => {
      //   const newPlayerPosition = [...prev];
      //   newPlayerPosition[player_idx] = idx;
      //   return newPlayerPosition;
      // });


       //this.socketService.gameLogicTurnoMovesTo(socket, cookies.username, idx, fin);
    }
  }
  

}
