import { Component } from '@angular/core';
import { DesplegableComponent } from '../desplegable/desplegable.component';
import { InputMessageComponent } from './input-message/input-message.component';
import { MessageListComponent } from './message-list/message-list.component';
declare const require: any;
const {socket, onChatResponse, onConnect, onChatTurn} = require('../../chat.js');

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
  // Mensajes compuestos por texto, user y offset
  messages: {type: string, username:string, text: string}[] = [];
  lastIndex: number = 0;
  nombreComponente: string ="chat";

  constructor() {
  }

  ngOnInit() {
    // Conexión con el socket
    socket.auth.username = 'abel';
    socket.auth.group = "0";
    socket.connect();
    
    socket.on("connect", onConnect);
    socket.on("chat response", this.onChatResponseLocal.bind(this));
    socket.on("chat turn", this.onChatTurnLocal);
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

  // Recibir mensajes del servidor y pasarlos a la lista de mensajes
  onChatResponseLocal(message: string, user: string, offset: number) {
    let auxMessage = onChatResponse(message, user, offset);
    this.messages.push(auxMessage);
    this.lastIndex++;
    // Scroll al final del chat
    setTimeout(() => {
      let chat = document.getElementById("chat-list");
      if (chat)
      chat.scrollTop = chat.scrollHeight;
    }, 0);
  }

  // Recibir turno del servidor
  onChatTurnLocal(username: string) {
    // return onChatTurn(username);
  }

  ngOnDestroy() {
    socket.off("chat response", this.onChatResponseLocal);
    socket.off("chat turn", this.onChatTurnLocal);
    socket.off("connect", onConnect);
    socket.disconnect();
  }
}
  