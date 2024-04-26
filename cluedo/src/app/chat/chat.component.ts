import { Component } from '@angular/core';
import { DesplegableComponent } from '../desplegable/desplegable.component';
import { InputMessageComponent } from './input-message/input-message.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageComponent } from './message/message.component';
import { LinkedList } from 'linked-list-typescript';
import { GameService } from '../servicios/servicio-game/game.service';
import { SocketService } from '../servicios/servicio-socket/socket.service';

declare const require: any;
const {
  socket,
  onChatResponse,
  onConnect,
  onChatTurn,
} = require('../../chat.js');

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [DesplegableComponent, InputMessageComponent, MessageListComponent, MessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: '../../../../../front-end-shared/css/Game/Chat/chat.css',
})
export class ChatComponent {
  desplegado: boolean = false;
  message: string = '';
  // Mensajes compuestos por texto, user y offset
  // messages: { type: string; username: string; text: string }[] = [];
  messages = new LinkedList<MessageComponent>()
  
  lastIndex: number = 0;
  nombreComponente: string = 'chat';
  
  constructor(public gameService: GameService, private socketService: SocketService) {}

  ngOnInit() {
    // Escuchar eventos de socket service para ser notificado de nuevos mensajes
    this.socketService.getMessageObservable().subscribe(
      (message) => {
        this.handleNewMessage(message);
      }
    );
  }

  // Cuando llega el evento mensajeEnviado del input, se gestiona el mensaje
  enviarMensaje(mensaje: string) {
    console.log('Mensaje del input que se va a enviar: ' + mensaje);
    // Enviar mensaje al servidor
    this.socketService.chatMessage(mensaje);
  }

  // Método para gestionar un nuevo mensaje que ha llegado del servidor
  private handleNewMessage(message: any) {
    this.messages.append(this.crearMensaje(message.msg, message.emisor, message.currentTimestamp));
  }
        
  private crearMensaje(text: string, username: string, timestamp: string) {
    const newMessage = new MessageComponent();
    newMessage.text = text;
    newMessage.username = username;
    newMessage.type = 'message';
    newMessage.timestamp = timestamp;
    newMessage.character = this.gameService.getPersonaje(username);
    
    console.log("Mensaje creado: ", JSON.stringify(newMessage));
    return newMessage;
  }

  // Método para cambiar el estado de la variable "desplegado" para desplazar el chat
  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }
}
