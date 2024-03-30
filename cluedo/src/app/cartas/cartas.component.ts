import { Component } from '@angular/core';

@Component({
  selector: 'app-carta',
  templateUrl: './cartas.component.html',
  standalone: true,
  styleUrl: '../../../../../front-end-shared/css/Game/Cartas/Carta.css'
})
export class CartasComponent {
  hover: boolean = true;
  player_name: string | undefined;

  constructor() {
    // Inicializar el nombre del jugador aquí si es necesario
  }
}
