import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  
  constructor() { 
    this.socket = io('http://localhost:3000');

    this.runSocketServer();
  }
  
  // Método para manejar los eventos enviados desde del servidor
  private runSocketServer(): void {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('game-info', (gameInfo: any) => {
      console.log('Game info received from server:', gameInfo);
      // Aquí puedes manejar la respuesta del servidor, por ejemplo, actualizar la interfaz de usuario con la información del juego
    });
  }

  // Método para solicitar la información del juego al servidor
  public requestGameInfo(): void {
    this.socket.emit('request-game-info');
  }
  
}
