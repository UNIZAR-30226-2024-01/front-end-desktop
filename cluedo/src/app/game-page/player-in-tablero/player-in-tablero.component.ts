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
        return "../../../assets/MrSoper.jpg";
      case "mr REDES":
        return "../../../assets/missRedes.jpg";
      case "mr PROG":
        return "../../../assets/MrProg.jpg";
      case "mr FISICA":
        return "../../../assets/missFisica.jpg";
      case "mr DISCRETO":
        return "../../../assets/mrDiscreto.jpg";
      case "mr IA":
        return "../../../assets/missIA.jpg";
      default:
        throw new Error("Personaje no encontrado");
    }
  }


}
