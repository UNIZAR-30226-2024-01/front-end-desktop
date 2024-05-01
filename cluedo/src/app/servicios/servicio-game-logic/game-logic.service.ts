import { Injectable, OnDestroy, numberAttribute } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SocketService } from '../servicio-socket/socket.service';
import { TurnoService } from '../servicio-turno/turno.service';
import { CeldasService } from '../servicio-celdas/celdas.service';
import { GameService } from '../servicio-game/game.service';
import { ShowCardsService } from '../servicio-cartas/cartas.service';
import { environment } from "../../../environments/environment";
// import { ShowCardsService } from './show-cards.service';
import { Router } from '@angular/router';

const { infoTablero, casillasPorHabitacion } = require('../../../../front-end-shared/infoTablero.js');

@Injectable({
  providedIn: 'root'
})
export class GameLogicService implements OnDestroy {
  private verbose = true;
  // private socket: SocketService;
  private socketio: SocketService
  private socket: Socket;
  private turnoService: TurnoService;
  private celdasService: CeldasService;
  private gameService: GameService;
  private cartasService: ShowCardsService;
  // private showCardsService: ShowCardsService;
  private router: Router;
  infoTablero: any;
  casillasPorHabitacion: any;

  constructor(
    socketio: SocketService,
    turnoService: TurnoService,
    celdasService: CeldasService,
    gameService: GameService,
    cartasService: ShowCardsService,
    // private socketService: SocketService,
    // showCardsService: ShowCardsService,
    router: Router
  ) {
    this.socketio = socketio;
    this.turnoService = turnoService;
    this.celdasService = celdasService;
    this.cartasService=cartasService;
    this.infoTablero = infoTablero;
    this.casillasPorHabitacion = casillasPorHabitacion;
    this.gameService = gameService;
    const options: { auth: { username: string, group: string, offset: string }, transports: string[] } = {
      auth: {
        username: gameService.username,
        group: '0',
        offset: this.socketio.obtenerFechaActual()
      },
      transports: ['polling', 'websocket']
    };
    this.socket = io(environment.apiUrl, options);
    // this.showCardsService = showCardsService;
    this.router = router;

    this.initializeSocketListeners();
  }

  ngOnDestroy(): void {
    // this.socket.onDestroy();
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
  }

  private initializeSocketListeners(): void {
    if (!this.socket) return;

    this.socket.on('turno-owner', (username: string) => {
      if (this.verbose) console.log('onTurnoOwner', username);
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
      this.celdasService.setPlayerPositions(newPlayerPositions); 
    });

    this.socket.on('turno-select-to-show', (usernameAsking: string, usernameShower: string, character: string, gun: string, room: string) => {
      if (this.verbose) console.log('onTurnoSelectToShow', usernameAsking, usernameShower, character, gun, room);

      const onClick = (card: string) => {
        console.log('card selected', card);
        this.socketio.turnoCardSelected(usernameAsking, usernameShower, card);
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
  this.socket.disconnect();
  this.router.navigate(['/home-page']);
});


this.socket.on('game-state', ( posiciones, cartas, sospechas, turnoOwner) => {
  if (this.verbose) console.log('onGameState',posiciones, cartas, sospechas, turnoOwner);
  this.celdasService.setPlayerPositions(posiciones);
  this.gameService.setCards(cartas);
  // this.gameService.setSospechas(sospechas);
  if (turnoOwner === this.socketio.getUserName()) {
    console.log('Reiniciando turno...');
    this.turnoService.restartTurno();
  } else {
    console.log('turnoOwner != a mí mismo', turnoOwner);
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
        const inRoom = infoTablero[pos].isRoom;
        if (inRoom) {
          const roomName = infoTablero[pos].roomName;
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

    if (data.turnoOwner) {
      if (data.turnoOwner === this.socketio.getUserName()) {
        console.log('Reiniciando turno...');
        this.turnoService.restartTurno();
      } else {
        console.log('turnoOwner != a mí mismo', data.turnoOwner);
        this.turnoService.setTurnoOwner(data.turnoOwner);
        this.turnoService.setParteTurno('es-tu-turno');
      }
    }

  });

    
    this.socket.on('start-game', (info_partida) => {
      console.log('Game info received from server:', info_partida);
      this.gameService.setPersonajes(info_partida.names);
      this.gameService.setArmas(info_partida.guns);
      this.gameService.setLugares(info_partida.rooms);
      this.gameService.setUsuarios(info_partida.available);
      this.celdasService.setPlayerPositions(info_partida.posiciones);
    });
  

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
      this.socketio.sendSospechas(this.gameService.getSospechas());
    });
  }


}

    