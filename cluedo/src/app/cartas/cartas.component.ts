import { Component,Input } from '@angular/core';
import { GameItemsComponent } from '../game-items/game-items.component';

@Component({
  selector: 'app-carta',
  templateUrl: './cartas.component.html',
  standalone: true,
  imports:[GameItemsComponent],
  styleUrl: '../../../../../front-end-shared/css/Game/Cartas/Carta.css'
})
export class CartasComponent {
  hover: boolean = true;
  @Input() player_name!: string ;
  constructor() {
    // Inicializar el nombre del jugador aquí si es necesario
  }
}
