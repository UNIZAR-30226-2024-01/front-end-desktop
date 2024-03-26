import { Component, Input } from '@angular/core';
import { CeldaType } from './celda-type.enum';

@Component({
  selector: 'app-celda',
  standalone: true,
  imports: [],
  templateUrl: './celda.component.html',
  styleUrl: '../../../../../../front-end-shared/css/Game/Tablero/Celda.css'
})


export class CeldaComponent {
  estiloCelda: any = {};
  @Input() propiedadesCelda!: any;

  clase : string = "";
  estilo: any = {};
  
  isRoom() {return this.propiedadesCelda.isRoom;}
  roomName() {return this.propiedadesCelda.roomName;}
  isStartingCell() {return this.propiedadesCelda.isStartingCell;}
  isWalkable() {return this.propiedadesCelda.isWalkable;}
  isDoor() {return this.propiedadesCelda.isDoor;}
  idx() {return this.propiedadesCelda.idx;}
}