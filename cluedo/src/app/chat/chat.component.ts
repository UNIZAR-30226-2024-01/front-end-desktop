import { Component } from '@angular/core';
import { DesplegableComponent } from '../desplegable/desplegable.component';
import { InputMessageComponent } from './input-message/input-message.component';
import { MessageListComponent } from './message-list/message-list.component';
declare const require: any;
const socket = require('./chat.js');


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [DesplegableComponent, InputMessageComponent, MessageListComponent],
  templateUrl: './chat.component.html',
  styleUrl: '../../../../../front-end-shared/css/game/Chat/chat.css'
})
export class ChatComponent {
  desplegado: boolean = false;
  nombreComponente: string ="chat";

  // Método para cambiar el estado de la variable "desplegado" para desplazar el chat
  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }

  // Cuando llega el evento mensajeEnviado del input, se gestiona el mensaje
  gestionarMensaje(mensaje: string) {
    console.log("gestionarMensaje - Mensaje: " + mensaje);    
  }
}
