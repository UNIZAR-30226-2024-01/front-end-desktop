import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SocketService } from '../servicio-socket/socket.service';
import { TurnoService } from '../servicio-turno/turno.service';
import { CeldasService } from '../servicio-celdas/celdas.service';
import { GameService } from '../servicio-game/game.service';
import { environment } from "../../../environments/environment";
// import { ShowCardsService } from './show-cards.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService implements OnDestroy {
  private verbose = true;
  private socket: SocketService;
  private socketReal: Socket;
  private turnoService: TurnoService;
  private celdasService: CeldasService;
  private gameService: GameService;
  // private showCardsService: ShowCardsService;
  private router: Router;

  constructor(
    socket: SocketService,
    turnoService: TurnoService,
    celdasService: CeldasService,
    gameService: GameService,
    // showCardsService: ShowCardsService,
    router: Router
  ) {
    this.socket = socket;
    this.turnoService = turnoService;
    this.celdasService = celdasService;
    this.gameService = gameService;
    const options: { auth: { username: string, group: string, offset: string }, transports: string[] } = {
      auth: {
        username: gameService.username,
        group: '0',
        offset: this.socket.obtenerFechaActual()
      },
      transports: ['polling', 'websocket']
    };
    this.socketReal = io(environment.apiUrl, options);
    // this.showCardsService = showCardsService;
    this.router = router;

    this.initializeSocketListeners();
  }

  ngOnDestroy(): void {
    this.socket.onDestroy();
  }

  private initializeSocketListeners(): void {
    if (!this.socket) return;
    this.socket.serverListener();
  }
    
   onTurnoOwner(username: string): void {
    if (this.verbose) console.log('onTurnoOwner', username);
    this.turnoService.setTurnoOwner(username);
    this.turnoService.setParteTurno('es-tu-turno');
  }

   onTurnoMovesToResponse(username: string, position: number): void {
    if (this.verbose) console.log('onTurnoMovesToResponse', username, position);
    const playerIdx = this.gameService.usernames.indexOf(username);
    const newPlayerPositions = [...this.celdasService.getPlayerPositions()];
    newPlayerPositions[playerIdx] = position;
    this.celdasService.setPlayerPositions(newPlayerPositions); 
    
  }

   onTurnoSelectToShow(usernameAsking: string, usernameShower: string, character: string, gun: string, room: string): void {
    if (this.verbose) console.log('onTurnoSelectToShow', usernameAsking, usernameShower, character, gun, room);

    const onClick = (card: string) => {
      console.log('card selected', card);
      this.socket.emitirEvento(() => this.socketReal.emit('turno-card-selected', usernameAsking, card));

    };
    // showCardElection(username_asking, cards, [character, gun, room], onClick);
  }
}
      // showCardElection(username_asking, cards, [character, gun, room], onClick);