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
  @Input() tipoCelda!: CeldaType;
  
  nombreClase: string = "celda";
  isRoom: boolean = false;
  roomName: string = "";
  hasPlayer: boolean = false;
}