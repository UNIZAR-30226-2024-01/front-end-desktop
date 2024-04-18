import { Component } from '@angular/core';
import { Input } from '@angular/core';

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
  colorPlayer: string = "red";

  getColor(): string {
    switch (this.personaje) {
      case "mr SOPER":
        return "#80b37e";
      case "mr REDES":
        return "#fcfd7f";
      case "mr PROG":
        return "#7fd2e7";
      case "mr FISICA":
        return "#fdfdfd";
      case "mr DISCRETO":
        return "#dea9fb";
      case "mr IA":
        return "#fc7e7e";
      default:
        return "#000";
    }
  }

  getRutaImagen(): string {
    switch (this.personaje) {
      case "mr SOPER":
        return "../../../assets/images/personajes_imagen/png/MrSoper.png";
      case "mr REDES":
        return "../../../assets/images/personajes_imagen/png/missRedes.png";
      case "mr PROG":
        return "../../../assets/images/personajes_imagen/png/MrProg.png";
      case "mr FISICA":
        return "../../../assets/images/personajes_imagen/png/missFisica.png";
      case "mr DISCRETO":
        return "../../../assets/images/personajes_imagen/png/mrDiscreto.png";
      case "mr IA":
        return "../../../assets/images/personajes_imagen/png/missIA.png";
      default:
        throw new Error("Personaje no encontrado");
    }
  }

  getSyle(): string {
    return "player " + this.lado;
  }

}
