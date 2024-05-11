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

  // Devuelve un elemento aleatorio de un array
  obtenerElementoAleatorio(arr: string[]): string {
    const indiceAleatorio = Math.floor(Math.random() * arr.length);
    return arr[indiceAleatorio];
  }

  // Devuelve un personaje aleatorio
  getRandomPlayer(): string {
    return this.obtenerElementoAleatorio(this.gameService.getPersonajes());
  }

  // Devuelve un arma aleatoria
  getRandomWeapon(): string {
    return this.obtenerElementoAleatorio(this.gameService.getArmas());
  }

  // Devuelve un lugar aleatorio
  getRandomPlace(): string {
    return this.obtenerElementoAleatorio(this.gameService.getLugares());
  }
}
