import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { TurnoService } from '../servicio-turno/turno.service';
import { CeldasService } from '../servicio-celdas/celdas.service';
import { GameService } from '../servicio-game/game.service';
import { Router } from '@angular/router';
import { ShowCardsService } from '../servicio-cartas/cartas.service';
// import { GameLogicService } from '../servicio-game-logic/game-logic.service';
import { environment } from "../../../environments/environment";
import { publishFacade } from '@angular/compiler';
import { DefaultEventsMap } from '@socket.io/component-emitter';
const { casillasPorHabitacion } = require('../../../../../../front-end-shared/infoTablero.js');
import * as infoTablero from '../../../assets/infoTablero.json';


// const {
//   socket
// } = require('../../chat.js');

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket: Socket;
  private eventMessage = new Subject<any>();   // Subject para emitir eventos a los componentes que lo necesiten
  private verbose = true;
  private turnoService: TurnoService;
  private celdasService: CeldasService;
  private gameService: GameService;
  private cartasService: ShowCardsService;
  private router: Router;
  infoTablero: any[] = infoTablero.infoTablero2;
  casillasPorHabitacion: any;

  constructor( turnoService: TurnoService,
    celdasService: CeldasService,
    gameService: GameService,
    cartasService: ShowCardsService,
    router: Router) { 
    const options: { auth: { username: string, group: string, offset: string }, transports: string[] } = {
      auth: {
        username: localStorage.getItem('username') ?? 'Anonymous',
        group: '0',
        offset: this.obtenerFechaActual()
      },
      transports: ['polling', 'websocket']
    };
    this.turnoService = turnoService;
    this.celdasService = celdasService;
    this.gameService = gameService;
    this.cartasService = cartasService;
    this.router = router;
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


  onDestroy():void{
    this.socket.removeListener('turno-owner');
    this.socket.removeListener('turno-moves-to-response');
    this.socket.removeListener('turno-show-cards');
    this.socket.removeListener('turno-select-to-show');
    this.socket.removeListener('turno-asks-for-response');
    this.socket.removeListener('game-over');
    this.socket.removeListener('close-connection');
    this.socket.removeListener('game-state');
    this.socket.removeListener('cards');
    this.socket.removeListener('game-info');
    this.socket.removeListener('start-game');
    /////////////////////////////////////////////
    this.socket.removeListener('turno-owner');
    this.socket.removeListener('turno-moves-to-response');
    this.socket.removeListener('turno-show-cards');
    this.socket.removeListener('turno-select-to-show');
    this.socket.removeListener('turno-asks-for-response');
    this.socket.removeListener('game-over');
    this.socket.removeListener('close-connection');
    this.socket.removeListener('game-state');
    this.socket.removeListener('cards');
    this.socket.removeListener('game-info');
    this.socket.removeListener('start-game');
    this.socket.removeListener('request-sospechas');
    this.socket.removeListener('chat-response');
    this.socket.removeListener('game-paused-response');
    this.socket.removeListener('game-resumed-response');
    this.socket.removeListener('turno-owner(username_owner)');
  }


  // Método para escuchar eventos del servidor
  serverListener(): void {

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
      // this.gameLogicService.onTurnoOwner(username_owner)
    });

    this.socket.on('connect', () => {
      console.log('Conectado al servidor!');
    });
        
  
    this.socket.on('start-game-response', (info_partida) => {
      console.log('Game info received from server:', info_partida);
      this.gameService.setPersonajes(info_partida.names);
      this.gameService.setArmas(info_partida.guns);
      this.gameService.setLugares(info_partida.rooms);
      this.gameService.setUsuarios(info_partida.available);
      this.celdasService.setPlayerPositions(info_partida.posiciones);
    });
////////////////////////////////////////////////////////////
const infoTablero = require('../../../assets/infoTablero.json');
const casillasPorHabitacion = require('../../../../../../front-end-shared/infoTablero.js');
this.infoTablero = infoTablero.infoTablero2;
this.casillasPorHabitacion = casillasPorHabitacion.casillasPorHabitacion;
this.socket.on('turno-owner', (username: string) => {
  if (this.verbose) console.log('onTurnoOwner', username);
  console.log('(turno-owner)es el turno de ',username);
console.log('setteando el user desde sickert ',username);
  this.turnoService.setTurnoOwner(username);
  this.turnoService.setParteTurno('es-tu-turno');
});

this.socket.on('turno-moves-to-response', (username: string, position: number) => {
  if (this.verbose) console.log('onTurnoMovesToResponse', username, position);

  if (this.infoTablero[position].isRoom) {
    const roomName = this.infoTablero[position].roomName;
    let cells = this.casillasPorHabitacion[parseInt(roomName) - 1].cells;
    cells = cells.filter((c: number) => !this.celdasService.getPlayerPositions().includes(c));
    position = cells[Math.floor(Math.random() * cells.length)];
  }

  const playerIdx = this.gameService.usernames.indexOf(username);
  const newPlayerPositions = [...this.celdasService.getPlayerPositions()];
  newPlayerPositions[playerIdx] = position;
  console.log('newPlayerPositions', newPlayerPositions);
  this.celdasService.setPlayerPositions(newPlayerPositions); 
});

this.socket.on('turno-select-to-show', (usernameAsking: string, usernameShower: string, character: string, gun: string, room: string) => {
  if (this.verbose) console.log('onTurnoSelectToShow', usernameAsking, usernameShower, character, gun, room);

  const onClick = (card: string) => {
    console.log('card selected', card);
    this.turnoCardSelected(usernameAsking, usernameShower, card);
  };
  
  this.cartasService.showCardElection(usernameAsking, this.gameService.cards,[character, gun, room], onClick);
});

this.socket.on('turno-show-cards',(usernameAsking: string, usernameShower: string, card: string[], characterAsked: string, gunAsked: string, roomAsked: string)=>{
  if (this.verbose) console.log('onTurnoShowCards', usernameAsking, usernameShower, card);
  // muestra la carta que ha enseñado el jugador
  // si te enseña a ti: muestra la carta
  // si te enseña a otro: muestra el dorso de la carta

  const iAmAsking = usernameAsking === this.gameService.username;
  const cardToShow = iAmAsking || card[0] === '' ? card : ['back'];

  console.log('cardToShow', cardToShow);

  this.cartasService.showCardShowed(usernameAsking, usernameShower, cardToShow, [characterAsked, gunAsked, roomAsked]);
} );

this.socket.on('turno-asks-for-response',(usernameAsking: string, character: string, gun: string, room: string, win: boolean)=>{
  if (this.verbose) console.log('onTurnoAsksForResponse', usernameAsking, character, gun, room, win);
  // mustra un modal enseñando que pregunta ha hecho el jugador
  // const text = `${username_asking} ha preguntado: ¿ha sido ${character} con ${gun} en ${room}?`;
  const cards = [character, gun, room];
  console.log('Cards GameLogic', cards);
  this.cartasService.showQuestion(usernameAsking, cards);
} );




//game-over
this.socket.on('game-over', (username: string, win: boolean) => {
if (this.verbose) console.log('onGameOver', username, win);
if (win) {
  localStorage.setItem('partida_actual','' );
// muestra un modal con el ganador
//this.onGameOver(username, win);
}
alert('El usuario ' + username + (win ? ' ha ganado' : ' ha perdido') + ' la partida.');
// muestra un modal diciendo que ha ganado el jugador
if (win) this.router.navigate(['/home-page']);
// else --> te puedes quedar en la partida visualizándola pero no podrás hacer nada (turnoOwner ya no puede asociarse a tu usuario)

});



this.socket.on('close-connection', () => {
if (this.verbose) console.log('onCloseConnection');
// muestra un modal con el mensaje de que se ha cerrado la conexión
alert('Conectado en otro dispositivo. Conexión cerrada.');
console.log('Cerrando conexión...');
this.socket.disconnect();
this.router.navigate(['/home-page']);
});


this.socket.on('game-state', ( posiciones, cartas, sospechas, turnoOwner) => {
if (this.verbose) console.log('onGameState',posiciones, cartas, sospechas, turnoOwner);
this.celdasService.setPlayerPositions(posiciones);
this.gameService.setCards(cartas);
// this.gameService.setSospechas(sospechas);
if (turnoOwner === this.getUserName()) {
  console.log('Reiniciando turno...');
  this.turnoService.restartTurno();
} else {
  console.log('(game-state)turnoOwner != a mí mismo', turnoOwner);
  this.turnoService.setTurnoOwner(turnoOwner);
}
});

this.socket.on('cards', (cards: any) => {
if (this.verbose) console.log('onCards', cards);
// actualiza las cartas del jugador
this.gameService.setCards(cards);
});

this.socket.on('game-info', (data: any) => {
console.log('Game info:', data);

if (data.cards) {
  this.gameService.setCards(data.cards);
  this.gameService.setStarted(true);
}

if (data.sospechas) {
  const json = data.sospechas.replace(/{/g, '[').replace(/}/g, ']');
  const newSospechas = JSON.parse(json);
  this.gameService.setSospechas(newSospechas);
}

if (data.posiciones) {
  const newPositions: number[]=[];
  for (const pos of data.posiciones) {
    const inRoom = this.infoTablero[pos].isRoom;
    if (inRoom) {
      const roomName = this.infoTablero[pos].roomName;
      let { cells } = casillasPorHabitacion[parseInt(roomName) - 1];
      cells = cells.filter((c:number) => !newPositions.includes(c));
      const randomCell = cells[Math.floor(Math.random() * cells.length)];
      newPositions.push(randomCell);
    } else {
      newPositions.push(pos);
    }
  }
  this.celdasService.setPlayerPositions(newPositions);
}
console.log('es el turno de ',data.turnoOwner);

if (data.turnoOwner) {
  if (data.turnoOwner === this.getUserName()) {
    console.log('Reiniciando turno...');
    this.turnoService.restartTurno();
  } else {
    console.log('turnoOwner != a mí mismo', data.turnoOwner);
    this.turnoService.setTurnoOwner(data.turnoOwner);
    this.turnoService.setParteTurno('es-tu-turno');
  }
}

});


// this.socket.on('start-game-response', (info_partida) => {
//   console.log('Game info received from server:', info_partida);
//   this.gameService.setPersonajes(info_partida.names);
//   this.gameService.setArmas(info_partida.guns);
//   this.gameService.setLugares(info_partida.rooms);
//   this.gameService.setUsuarios(info_partida.available);
//   this.celdasService.setPlayerPositions(info_partida.posiciones);
// });
  


//game-paused-response
this.socket.on('game-paused-response', () => {
  console.log('Game paused');
  alert('La partida ha sido pausada');
  this.gameService.setRequestedPause(false);
  this.gameService.setPausedGame(true);
});


// game-resumed-response
this.socket.on('game-resumed-response', () => {
  console.log('Game resumed');
  alert('La partida ha sido reanudada');
  this.gameService.setRequestedPause(false);
  this.gameService.setPausedGame(false);
});



// request-sospechas

this.socket.on('request-sospechas', () => {
  console.log('Request sospechas');
  this.sendSospechas(this.gameService.getSospechas());
});
}

  // Método para emitir eventos al servidor teniendo en cuenta si el cliente está conectado o no
  emitirEvento(callback: () => void) {
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

  public gameLogicTurnoAsksFor(socket:any, username_asking: string, character: string, gun: string, room: string, is_final: boolean) :void{
    console.log('GameLogicTurnoAsksFor', username_asking, character, gun, room, is_final);
    this.emitirEvento(() => this.socket.emit('turno-asks-for', username_asking, character, gun, room, is_final));
  }


  public emit(text: string, list: any[]): void{
    this.emitirEvento(() => this.socket.emit(text, ...list));
  }
  // Método para indicar al servidor que el cliente se va a desconectar
  public disconnected(): void {
    this.emitirEvento(() => this.socket.emit('disconnect'));
  }

  public connect(): void {
    this.emitirEvento(() => this.socket.connect());
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
  public continuar_partida() {
    this.emitirEvento(() => this.socket.emit('request-resume-game', {}));
  }
  public pausar_partida() {
    this.emitirEvento(() => this.socket.emit('request-pause-game', {}));
  }
  public turnoCardSelected(usernameAsking: string, usernameShower: string, card: string){
    this.emitirEvento(() => this.socket.emit('turno-card-selected', usernameAsking, usernameShower, card));
  }
  public sendSospechas(sospecha: string[]){
    this.emitirEvento(() => this.socket.emit('response-sospechas', sospecha));
  }
  
  obtenerFechaActual() {
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
