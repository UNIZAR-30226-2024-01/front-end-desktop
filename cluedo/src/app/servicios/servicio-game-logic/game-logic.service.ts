import { Injectable, OnDestroy } from '@angular/core';
import { SocketService } from '../servicio-socket/socket.service';
import { TurnoService } from '../servicio-turno/turno.service';
import { CeldasService } from '../servicio-celdas/celdas.service';
import { GameService } from '../servicio-game/game.service';
// import { ShowCardsService } from './show-cards.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService implements OnDestroy {
  private verbose = true;
  private socket: SocketService;
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
    // this.showCardsService = showCardsService;
    this.router = router;

    this.initializeSocketListeners();
  }

  ngOnDestroy(): void {
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
      const playerIdx = this.gameInfoService.usernames.indexOf(username);
      this.celdasService.setPlayerPositions((prev) => {
        const newPlayerPositions = [...prev];
        newPlayerPositions[playerIdx] = position;
        return newPlayerPositions;
      });
    });

    this.socket.on('turno-select-to-show', (usernameAsking: string, usernameShower: string, character: string, gun: string, room: string) => {
      if (this.verbose) console.log('onTurnoSelectToShow', usernameAsking, usernameShower, character, gun, room);

      const onClick = (card: string) => {
        console.log('card selected', card);
        this.socket.emit('turno-card-selected', usernameAsking, this.cookies.username, card);
      };

      // showCardElection(username_asking, cards, [character, gun, room], onClick);
    });

    // Add more socket event listeners here...

    // Don't forget to remove the listeners in the ngOnDestroy method
  }
}
