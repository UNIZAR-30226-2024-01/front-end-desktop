import { Component } from '@angular/core';
import { CartasComponent } from '../cartas/cartas.component';
import { DesplegableComponent } from '../desplegable/desplegable.component';
import { CommonModule } from '@angular/common';

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
  constructor() {
    // Inicializar propiedades aquí si es necesario
  }

  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }

  getRandomObject(): string {
    const itemsPlayers = ['SOPER', 'FISICA', 'IA', 'PROG', 'REDES', 'DISCRETO'];
    const itemsObjects = ['CABLE', 'DISCO', 'ROUTER', 'SUSPENSO', 'TAZA', 'TECLADO', 'TROYANO'];
    const itemsPlaces = ['CAFETERIA', 'BAÑOS', 'RECEPCION', 'ESCALERAS', 'BIBLIOTECA', 'LABORATORIO', 'DESPACHO', 'AULANORTE', 'AULASUR'];
    const items = [...itemsPlayers, ...itemsObjects, ...itemsPlaces];
    return items[Math.floor(Math.random() * items.length)];
  }
}
