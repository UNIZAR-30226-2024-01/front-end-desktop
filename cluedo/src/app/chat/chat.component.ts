import { Component } from '@angular/core';
import { DesplegableComponent } from '../desplegable/desplegable.component';
import { InputMessageComponent } from './input-message/input-message.component';
import { MessageListComponent } from './message-list/message-list.component';
declare const require: any;
const {socket} = require('../../chat.js');

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [DesplegableComponent, InputMessageComponent, MessageListComponent],
  templateUrl: './chat.component.html',
  styleUrl: '../../../../../front-end-shared/css/Game/Chat/chat.css'
})
export class ChatComponent{
  desplegado: boolean = false;
  message: string = '';
  messages: string[] = [];
  nombreComponente: string ="chat";

  constructor() {
    // Escucha el evento 'message' del socket y agrega el mensaje a la lista de mensajes
    // socket.on('message', (data: any) => {
    //   this.messages.push(data);
    // });
  }

  ngOnInit() {
    // Conexión con el socket
    socket.auth.username = 'abel';
    socket.auth.group = "0";
    socket.connect();
  }

  // Método para cambiar el estado de la variable "desplegado" para desplazar el chat
  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }

  // Cuando llega el evento mensajeEnviado del input, se gestiona el mensaje
  gestionarMensaje(mensaje: string) {
    console.log(socket.socket)
    console.log("gestionarMensaje - Mensaje: " + mensaje);  
    // Enviar mensaje al servidor

    

    socket.emit('chat message', mensaje);  
  }
}
  