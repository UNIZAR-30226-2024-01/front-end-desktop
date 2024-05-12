import { Component } from '@angular/core';
import { CartasComponent } from '../cartas/cartas.component';
import { DesplegableComponent } from '../desplegable/desplegable.component';
import { CommonModule } from '@angular/common';
import { GameService } from '../servicios/servicio-game/game.service';

@Component({
  selector: 'app-carta-desplegable',
  templateUrl: './cartas-desplegable.component.html',
  styleUrl: '../../../../../front-end-shared/css/Game/Cartas/CartaDesplegable.css',
  standalone: true,
  imports:[CartasComponent,DesplegableComponent,CommonModule]
})
export class CartasDesplegableComponent {
  desplegado: boolean = false;
  nombreComponente: string = 'cartas';
  style = { bottom: `${this.desplegado ? "0px" : "-335px"}` };
  constructor(private gameService : GameService) {
    // Inicializar propiedades aquí si es necesario
  }

  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }

  //Devuelve la carta de personaje del usuario
  getCardWeapon(): string {
    console.log("Carta de arma (desde cartas-desplegable): ", this.gameService.getCard(0));
    return this.gameService.getCard(0);
  }

  //Devuelve la carta de arma del usuario
  getCardPlayer(): string {
    return this.gameService.getCard(1);
  }

  //Devuelve la carta de habitación del usuario
  getCardRoom(): string {
    return this.gameService.getCard(2);
  }
}
