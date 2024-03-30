import { Component } from '@angular/core';
import { CartasComponent } from '../cartas/cartas.component';

@Component({
  selector: 'app-carta-desplegable',
  templateUrl: './cartas-desplegable.component.html',
  styleUrl: '../../../../../front-end-shared/css/Game/Cartas/CartaDesplegable.css',
  standalone: true,
  imports:[CartasComponent]
})
export class CartasDesplegableComponent {
  desplegable: boolean = false;

  constructor() {
    // Inicializar propiedades aquí si es necesario
  }

  toggleDesplegable() {
    this.desplegable = !this.desplegable;
  }

  getRandomObject(): string {
    const itemsPlayers = ['SOPER', 'FISICA', 'IA', 'PROG', 'REDES', 'DISCRETO'];
    const itemsObjects = ['CABLE', 'DISCO', 'ROUTER', 'SUSPENSO', 'TAZA', 'TECLADO', 'TROYANO'];
    const itemsPlaces = ['CAFETERIA', 'BAÑOS', 'RECEPCION', 'ESCALERAS', 'BIBLIOTECA', 'LABORATORIO', 'DESPACHO', 'AULANORTE', 'AULASUR'];
    const items = [...itemsPlayers, ...itemsObjects, ...itemsPlaces];
    return items[Math.floor(Math.random() * items.length)];
  }
}
