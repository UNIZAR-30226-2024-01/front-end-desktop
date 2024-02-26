import { Component } from '@angular/core';
import { DesplegableComponent } from './desplegable/desplegable.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [DesplegableComponent],
  templateUrl: './chat.component.html',
  styleUrl: '../../../../../front-end-shared/css/Chat.css'
})
export class ChatComponent {
  desplegado: boolean = false;

  // Método para cambiar el estado de la variable "desplegado"
  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }

  desplegar() {
    this.toggleDesplegado();
  }
}
