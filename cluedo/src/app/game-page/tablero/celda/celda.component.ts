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

  estiloCelda = {
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

  ngOnInit() {
    this.estilarCelda();
    this.anadirClase();
  }

  anadirClase() {
    if (this?.getIsRoom()) {
      this.clase = "room room-" + this.getRoomName();
    } else if (!this?.getIsWalkable()) {
      this.clase = "invalid";
    } else {
      this.clase = "celda ";
      if (this.fila % 2 === 0) {
        this.clase += this.columna % 2 === 0 ? "dark" : "light";
      } else {
        this.clase += this.columna % 2 === 0 ? "light" : "dark";
      }

      if (this.getIsStartingCell()) {
        this.clase += " start start-" + this.getIsStartingCell();
      }
    }
  }

  estilarCelda() {
    if (this?.getIsRoom() || !this?.getIsWalkable()) {
      this.estiloCelda.width += 2;
      this.estiloCelda.height += 2;
    }
  }

  getRotation() {
    switch(this.getIsDoor()) {
      case "u":
        return 270;
      case "d":
        return 90;
      case "l":
        return 180;
      case "r":
        return 0;
      default:
        return -1;
    }
  }

}