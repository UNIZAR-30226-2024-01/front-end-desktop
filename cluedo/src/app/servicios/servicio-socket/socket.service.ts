import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { GameService } from '../servicio-game/game.service';
// const {
//   socket
// } = require('../../chat.js');

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private eventMessage = new Subject<any>();   // Subject para emitir eventos a los componentes que lo necesiten
  
  constructor(gameService: GameService) { 
    const options = {
      auth: {
        username: gameService.username,
        group: '0',
        offset: this.obtenerFechaActual()
      },
      transports: ['polling', 'websocket']
    };

    this.socket = io('http://localhost:3000', options);
    this.serverListener();
  }



  // Método para escuchar eventos del servidor
  private serverListener(): void {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
    });

    this.socket.on('game-info', (gameInfo: any) => {
      console.log('Game info received from server:', gameInfo);
    });
    
    this.socket.on('chat-response', (emisor, msg, currentTimestamp, date) => {    
      this.sendData({emisor, msg, currentTimestamp, date});
    });

  }

  
  // Método para indicar al servidor que el cliente se va a desconectar
  public disconnect(): void {
    this.socket.emit('disconnect');
  }
  
  // Método para indicar al servidor que empiece el juego
  public startGame(): void {
    this.socket.emit('start-game');
  }

  // Método para indicar al servidor que se ha seleccionado un personaje
  public selectCharacter(character: string): void {
    this.socket.emit('character-selected', character);
  }
  
  // Método para chat message
  public chatMessage(message: string): void {
    this.socket.emit('chat-message', message);
  }
  
  // Método para solicitar la información del juego al servidor
  public requestGameInfo(): void {
    this.socket.emit('request-game-info');
  }
  
  private obtenerFechaActual() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
    const dia = ("0" + fecha.getDate()).slice(-2);
    const hora = ("0" + fecha.getHours()).slice(-2);
    const minutos = ("0" + fecha.getMinutes()).slice(-2);
    const segundos = ("0" + fecha.getSeconds()).slice(-2);
    const milisegundos = ("0" + fecha.getMilliseconds()).slice(-6); // Limitar a tres dígitos de precisión
    const zonaHorariaOffset = fecha.getTimezoneOffset();
    const signoZonaHoraria = zonaHorariaOffset > 0 ? "-" : "+";
    const horasZonaHoraria = (
      "0" + Math.abs(fecha.getTimezoneOffset() / 60)
    ).slice(-2);
    
    return `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}.${milisegundos}${signoZonaHoraria}${horasZonaHoraria}`;
    //"2024-03-14 12:54:56.419369+01"
  }
  
  // ---------------------PATRÓN OBSERVER ---------------------
  
  // Método para enviar datos a los componentes que estén suscritos al evento
  sendData(data: any): void {
    this.eventMessage.next(data);
  }
  
  // Método para suscribirse al evento
  getMessageObservable() {
    return this.eventMessage.asObservable();
  }
  
  // ---------------------FIN PATRÓN OBSERVER ---------------------  
  
}
