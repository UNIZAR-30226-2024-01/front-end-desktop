/*import { Injectable, OnDestroy, numberAttribute } from '@angular/core';
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
  //private socket: Socket;
  private turnoService: TurnoService;
  private celdasService: CeldasService;
  private gameService: GameService;
  private cartasService: ShowCardsService;
  private router: Router;
  infoTablero: any;
  casillasPorHabitacion: any;

  constructor(
    private socketService: SocketService,
    turnoService: TurnoService,
    celdasService: CeldasService,
    gameService: GameService,
    cartasService: ShowCardsService,
    router: Router
  ) {
    this.turnoService = turnoService;
    this.celdasService = celdasService;
    this.gameService = gameService;
    this.cartasService = cartasService;
    this.router = router;
    //this.socket = this.socketService.socket;
    this.initializeSocketListeners();
    // const options: { auth: { username: string, group: string, offset: string }, transports: string[] } = {
    //   auth: {
    //     username: gameService.username,
    //     group: '0',
    //     offset: this.socketService.obtenerFechaActual()
    //   },
    //   transports: ['polling', 'websocket']
    // };
    // this.socket = this.socketService.socket;
    // // this.showCardsService = showCardsService;
    // this.router = router;

    // this.initializeSocketListeners();
  }

  ngOnDestroy(): void {
    this.socketService.onDestroy();
    this.socketService.socket.removeListener('turno-owner');
    this.socketService.socket.removeListener('turno-moves-to-response');
    this.socketService.socket.removeListener('turno-show-cards');
    this.socketService.socket.removeListener('turno-select-to-show');
    this.socketService.socket.removeListener('turno-asks-for-response');
    this.socketService.socket.removeListener('game-over');
    this.socketService.socket.removeListener('close-connection');
    this.socketService.socket.removeListener('game-state');
    this.socketService.socket.removeListener('cards');
    this.socketService.socket.removeListener('game-info');
    this.socketService.socket.removeListener('start-game');
  }

  private initializeSocketListeners(): void {
    if (!this.socketService.socket) return;

    this.socketService.socket.on('turno-owner', (username: string) => {
      if (this.verbose) console.log('onTurnoOwner', username);
      console.log('(turno-owner)es el turno de ',username);

      this.turnoService.setTurnoOwner(username);
      this.turnoService.setParteTurno('es-tu-turno');
    });

    this.socketService.socket.on('turno-moves-to-response', (username: string, position: number) => {
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

    this.socketService.socket.on('turno-select-to-show', (usernameAsking: string, usernameShower: string, character: string, gun: string, room: string) => {
      if (this.verbose) console.log('onTurnoSelectToShow', usernameAsking, usernameShower, character, gun, room);

      const onClick = (card: string) => {
        console.log('card selected', card);
        this.socketService.turnoCardSelected(usernameAsking, usernameShower, card);
      };
      
      this.cartasService.showCardElection(usernameAsking, this.gameService.cards,[character, gun, room], onClick);
    });

    this.socketService.socket.on('turno-show-cards',(usernameAsking: string, usernameShower: string, card: string[], characterAsked: string, gunAsked: string, roomAsked: string)=>{
      if (this.verbose) console.log('onTurnoShowCards', usernameAsking, usernameShower, card);
      // muestra la carta que ha enseñado el jugador
      // si te enseña a ti: muestra la carta
      // si te enseña a otro: muestra el dorso de la carta

      const iAmAsking = usernameAsking === this.gameService.username;
      const cardToShow = iAmAsking || card[0] === '' ? card : ['back'];

      console.log('cardToShow', cardToShow);

      this.cartasService.showCardShowed(usernameAsking, usernameShower, cardToShow, [characterAsked, gunAsked, roomAsked]);
    } );

    this.socketService.socket.on('turno-asks-for-response',(usernameAsking: string, character: string, gun: string, room: string, win: boolean)=>{
      if (this.verbose) console.log('onTurnoAsksForResponse', usernameAsking, character, gun, room, win);
      // mustra un modal enseñando que pregunta ha hecho el jugador
      // const text = `${username_asking} ha preguntado: ¿ha sido ${character} con ${gun} en ${room}?`;
      const cards = [character, gun, room];
      console.log('Cards GameLogic', cards);
      this.cartasService.showQuestion(usernameAsking, cards);
    } );

    


  //game-over
  this.socketService.socket.on('game-over', (username: string, win: boolean) => {
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



  this.socketService.socket.on('close-connection', () => {
    if (this.verbose) console.log('onCloseConnection');
    // muestra un modal con el mensaje de que se ha cerrado la conexión
    alert('Conectado en otro dispositivo. Conexión cerrada.');
    console.log('Cerrando conexión...');
    this.socketService.socket.disconnect();
    this.socketService.disconnect();
    this.router.navigate(['/home-page']);
  });


  this.socketService.socket.on('game-state', ( posiciones, cartas, sospechas, turnoOwner) => {
    if (this.verbose) console.log('onGameState',posiciones, cartas, sospechas, turnoOwner);
    this.celdasService.setPlayerPositions(posiciones);
    this.gameService.setCards(cartas);
    // this.gameService.setSospechas(sospechas);
    if (turnoOwner === this.socketService.getUserName()) {
      console.log('Reiniciando turno...');
      this.turnoService.restartTurno();
    } else {
      console.log('(game-state)turnoOwner != a mí mismo', turnoOwner);
      this.turnoService.setTurnoOwner(turnoOwner);
    }
  });

  this.socketService.socket.on('cards', (cards: any) => {
    if (this.verbose) console.log('onCards', cards);
    // actualiza las cartas del jugador
    this.gameService.setCards(cards);
  });

  this.socketService.socket.on('game-info', (data: any) => {
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
    console.log('es el turno de ',data.turnoOwner);
    
    if (data.turnoOwner) {
      if (data.turnoOwner === this.socketService.getUserName()) {
        console.log('Reiniciando turno...');
        this.turnoService.restartTurno();
      } else {
        console.log('turnoOwner != a mí mismo', data.turnoOwner);
        this.turnoService.setTurnoOwner(data.turnoOwner);
        this.turnoService.setParteTurno('es-tu-turno');
      }
    }

  });

    
  // this.socketService.socket.on('start-game-response', (info_partida) => {
  //   console.log('Game info received from server:', info_partida);
  //   this.gameService.setPersonajes(info_partida.names);
  //   this.gameService.setArmas(info_partida.guns);
  //   this.gameService.setLugares(info_partida.rooms);
  //   this.gameService.setUsuarios(info_partida.available);
  //   this.celdasService.setPlayerPositions(info_partida.posiciones);
  // });
      
  

    //game-paused-response
    this.socketService.socket.on('game-paused-response', () => {
      console.log('Game paused');
      alert('La partida ha sido pausada');
      this.gameService.setRequestedPause(false);
      this.gameService.setPausedGame(true);
    });


    // game-resumed-response
    this.socketService.socket.on('game-resumed-response', () => {
      console.log('Game resumed');
      alert('La partida ha sido reanudada');
      this.gameService.setRequestedPause(false);
      this.gameService.setPausedGame(false);
    });



    // request-sospechas

    this.socketService.socket.on('request-sospechas', () => {
      console.log('Request sospechas');
      this.socketService.sendSospechas(this.gameService.getSospechas());
    });
  }


}

    */