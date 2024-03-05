import { CommonModule } from '@angular/common';
import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-desplegable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './desplegable.component.html',
  styleUrl: '../../../../../front-end-shared/css/desplegable.css'
})
export class DesplegableComponent {
  @Input() componentePadre!: string;  // Para recibir el componente padre y así aplicar estilos específicos
  @Output() desplegableClicked: EventEmitter<void> = new EventEmitter();

  desplegado: boolean = false; // Variable para controlar el estado del componente
  
  // Gestiona al hacer click en el componente desplegable
  handleClick(): void {
    this.desplegado = !this.desplegado; // Cambia el estado del componente
    this.desplegableClicked.emit(); // Emite un evento para notificar que se hizo clic en el componente
    console.log('DesplegableComponent.handleClick()');
  }

  // Método para cambiar el atributo path del svg en base al estado del componente "desplegado"
  getPathD(): string {
    switch (this.componentePadre) {
      case 'chat':
        return this.desplegado ?
          "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" :
          "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3";
      case 'tarjeta':
        return this.desplegado ?
        "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" :
        "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" ;
      default:
        throw new Error("Invalid value for componentePadre");
    }
  }
}
