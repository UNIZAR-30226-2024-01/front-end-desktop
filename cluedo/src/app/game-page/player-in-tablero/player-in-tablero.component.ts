import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { TurnoService } from '../../servicios/servicio-turno/turno.service';
const defaultBotNames = require('../../../../../../front-end-shared/infoTablero.js');

@Component({
  selector: 'app-player-in-tablero',
  standalone: true,
  imports: [],
  templateUrl: './player-in-tablero.component.html',
  styleUrl: '../../../../../../front-end-shared/css/Game/Tablero/PlayerInTablero.css'
})
export class PlayerInTableroComponent {
  @Input() personaje!: string;
  @Input() lado!: string;
  @Input() username!: string;
  @Input() userReal!: string;
  colorPlayer: string = "red";
  index: number = 0;
  className: string = "";
  constructor(public turnoService: TurnoService) {  }

  getColor(): string {
    switch (this.personaje) {
      case "mr SOPER":
        return "#80b37e";
      case "miss REDES":
        return "#fcfd7f";
      case "mr PROG":
        return "#7fd2e7";
      case "miss FISICA":
        return "#fdfdfd";
      case "mr DISCRETO":
        return "#dea9fb";
      case "miss IA":
        return "#fc7e7e";
      default:
        return "#000";
    }
  }

  getRutaImagen(): string {
    switch (this.personaje) {
      case "mr SOPER":
        return "../../../assets/images/personajes_imagen/png/MrSoper.png";
      case "miss REDES":
        return "../../../assets/images/personajes_imagen/png/missRedes.png";
      case "mr PROG":
        return "../../../assets/images/personajes_imagen/png/MrProg.png";
      case "miss FISICA":
        return "../../../assets/images/personajes_imagen/png/missFisica.png";
      case "mr DISCRETO":
        return "../../../assets/images/personajes_imagen/png/mrDiscreto.png";
      case "miss IA":
        return "../../../assets/images/personajes_imagen/png/missIA.png";
      default:
        console.log("Personaje no encontrado", this.personaje);
        return "";
      }
  }
  getClassName(): string {
    this.className = this.turnoService.getTurnoOwner() === this.userReal ? `player ${this.lado} turn` : `player ${this.lado}`;
    // console.log("EL user es :",this.userReal)
    // console.log("El turno es de:",this.turnoService.getTurnoOwner())
    return this.className;
  }

  getStyle(): string {
    return "player " + this.lado;
  }
}
