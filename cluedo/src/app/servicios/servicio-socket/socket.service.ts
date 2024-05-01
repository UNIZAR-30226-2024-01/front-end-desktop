import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { GameService } from '../servicio-game/game.service';
import { environment } from "../../../environments/environment";
// const {
//   socket
// } = require('../../chat.js');

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private eventMessage = new Subject<any>();   // Subject para emitir eventos a los componentes que lo necesiten

  constructor(private gameService: GameService) { 
    const options: { auth: { username: string, group: string, offset: string }, transports: string[] } = {
      auth: {
        username: gameService.username,
        group: '0',
        offset: this.obtenerFechaActual()
      },
      transports: ['polling', 'websocket']
    };

    this.socket = io(environment.apiUrl, options);
    this.serverListener();
  }
  setUsername(username: string) {
    (this.socket.auth as { username: string })['username'] = username;
  }
  
  setGroup(group: string) {
    (this.socket.auth as { group: string })['group'] = group;
  }
  getUserName() {
    return (this.socket.auth as { username: string })['username'];
  }
  getGroup() {
    return (this.socket.auth as { group: string })['group'];
  } 



  // Método para escuchar eventos del servidor
  private serverListener(): void {

    this.socket.on('game-info', (gameInfo: any) => {
      console.log('Game info received from server:', gameInfo);
      this.gameService.setPersonajes(gameInfo.names);
      this.gameService.setArmas(gameInfo.guns);
      this.gameService.setLugares(gameInfo.rooms);
      this.gameService.setUsuarios(gameInfo.available);
    });
    
    this.socket.on('chat-response', (emisor, msg, currentTimestamp, date) => {    
      this.sendData({emisor, msg, currentTimestamp, date});
    });

    this.socket.on('turno-owner(username_owner)', (username_owner) => {
      //Llamamos a alguna funcion del servicio game-logic
    });

  }


  // Método para emitir eventos al servidor teniendo en cuenta si el cliente está conectado o no
  private emitirEvento(callback: () => void) {
    // Si está conectado, emitir el evento
    console.log('Valor de this.socket.connected: ' + this.socket.connected);
    if (this.socket.connected) {
      callback();
    } else {
      // Si no está conectado, esperar a conectarse y luego emitir el evento
      console.log('No se puede emitir el evento porque no se ha conectado al servidor');
      this.socket.on('connect', () => {
        console.log('Valor de this.socket.connected: ' + this.socket.connected);
        console.log('Conectado al servidor!, emitiendo evento...');
        callback();
      });
    }
  }

  
  // Método para indicar al servidor que el cliente se va a desconectar
  public disconnect(): void {
    this.emitirEvento(() => this.socket.emit('disconnect'));
  }
  
  // Método para indicar al servidor que empiece el juego
  public startGame(): void {
    this.emitirEvento(() => this.socket.emit('start-game'));
  }

  // Método para indicar al servidor que se ha seleccionado un personaje
  public selectCharacter(character: string): void {
    this.emitirEvento(() => this.socket.emit('character-selected', character));
    
  }
  
  // Método para chat message
  public chatMessage(message: string): void {
    this.emitirEvento(() => this.socket.emit('chat-message', message));

  }
  public abandonar() {
    this.emitirEvento(() => this.socket.emit('leave-game'));
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
