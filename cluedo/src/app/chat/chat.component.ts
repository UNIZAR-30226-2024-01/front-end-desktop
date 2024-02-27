import { Component } from '@angular/core';
import { DesplegableComponent } from './desplegable/desplegable.component';
import { InputMessageComponent } from './input-message/input-message.component';
import { MessageListComponent } from './message-list/message-list.component';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [DesplegableComponent, InputMessageComponent, MessageListComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
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
