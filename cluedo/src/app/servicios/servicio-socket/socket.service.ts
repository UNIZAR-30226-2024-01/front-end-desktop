import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
// const {
//   socket
// } = require('../../chat.js');

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  
  constructor() { 
    const options = {
      auth: {
        username: 'abel',
        group: '0',
        offset: this.obtenerFechaActual()
      },
      transports: ['polling', 'websocket']
    };

    this.socket = io('http://localhost:3000', options);
    this.serverListener();
  }

  ngOnInit() {
    this.requestGameInfo();
  }

  
  private serverListener(): void {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
    });

    this.socket.on('game-info-response', (gameInfo: any) => {
      console.log('Game info received from server:', gameInfo);
    });
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

  
}
