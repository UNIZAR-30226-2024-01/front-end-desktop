import { Component, Input } from '@angular/core';
import { Celda } from './celda.interface'; 

@Component({
  selector: 'app-celda',
  standalone: true,
  imports: [],
  templateUrl: './celda.component.html',
  styleUrl: '../../../../../../../front-end-shared/css/Game/Tablero/Celda.css'
})


export class CeldaComponent {
  @Input() propiedadesCelda!: Celda;
  @Input() fila!: number;
  @Input() columna!: number;

  clase : string = "";

  estilo: { width: number, height: number} = {
    width: 26,
    height: 26
  };

  
  getIsRoom() {return this.propiedadesCelda.isRoom;}
  getRoomName() {return this.propiedadesCelda.roomName;}
  getIsStartingCell() {return this.propiedadesCelda.isStartingCell;}
  getIsWalkable() {return this.propiedadesCelda.isWalkable;}
  getIsDoor() {return this.propiedadesCelda.isDoor;}
  getIdx() {return this.propiedadesCelda.idx;}
  getFila() {return this.fila;}
  getColumna() {return this.columna;}

  constructor() {
    this.estilarCelda();
  }

  estilarCelda() {
    
  }

}