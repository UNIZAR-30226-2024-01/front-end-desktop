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
  constructor(public gameService : GameService) {
    console.log("cards: ", this.gameService.cards);
    // Inicializar propiedades aquí si es necesario
  }
carta1: string = this.getcarta1();
carta2: string = this.getcarta2();
carta3: string = this.getcarta3();

  updateCartas(): void {
    this.carta1 = this.getcarta1();
    this.carta2 = this.getcarta2();
    this.carta3 = this.getcarta3();
  }
  getcarta1(): string {
    console.log("cards: ", this.gameService.cards);
    return this.gameService.cards[0];
    return localStorage.getItem('carta1') ?? this.getRandomPlayer();
  }

  getcarta2(): string {
    return this.gameService.cards[1];
    return localStorage.getItem('carta2') ?? this.getRandomWeapon();
  }

  getcarta3(): string {
    return this.gameService.cards[2];
    return localStorage.getItem('carta3') ?? this.getRandomPlace();
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
