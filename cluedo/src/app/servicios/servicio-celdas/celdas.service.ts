import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TurnoService } from '../servicio-turno/turno.service';
import { GameService } from '../servicio-game/game.service';
// import { cellsClose } from '../../../../bfs.mjs';

declare const require: any;
const {
//falta hacer
} = require('../../../../bfs.mjs');

@Injectable({
  providedIn: 'root'
})
export class CeldasService {
  private celdasOptionsSubject = new BehaviorSubject<boolean[]>([]);
  celdasOptions$ = this.celdasOptionsSubject.asObservable();
  private dados: number = 0;
  private playerPositionsSubject = new BehaviorSubject<number[]>([]);
  playerPositions$ = this.playerPositionsSubject.asObservable();
  playerPositions : number[] |undefined;
  celdasOptions : boolean[] |undefined;

  constructor(private turnoService: TurnoService, private gameService: GameService) {
    // Inicializar los BehaviorSubject con los valores predeterminados
    const celdasOptionsArray = Array(24 * 24).fill(false);
    this.celdasOptionsSubject.next(celdasOptionsArray);

    const playerPositionsArray = [120, 432, 561, 16, 191, 566];
    this.playerPositionsSubject.next(playerPositionsArray);

    this.turnoService.dados$.subscribe(dados => {
    //this.dados = this.turnoService.getDados();
    this.dados = dados;
    });

    this.playerPositions$.subscribe(playerPositions => {
      this.playerPositions = playerPositions;
    });
    
    this.celdasOptions$.subscribe(celdasOptions => {
      this.celdasOptions = celdasOptions;
    });
    
  }

  updateCeldasOptions(): void {
    if (!this.turnoService.dados$ || !this.gameService.getUsernames() || !this.playerPositions) return;
    //if (!this.turnoService.getDados() || !this.gameService.getUsernames() || !this.playerPositions) return;
    const usernames = this.gameService.getUsernames();
    const playerIdx = usernames.indexOf(this.gameService.getUsername());
    const pp = this.playerPositions?.[playerIdx];
    if (!pp) return;

    // const bfs = this.cellsClose(pp, this.dados, this.playerPositions);
      
    //   const newPrev = this.celdasOptions;

    //   bfs.forEach((c) => (newPrev[c] = true));
    //   this.playerPositions.forEach((c) => (newPrev[c] = false));

    //   const bfsDoors = bfs.filter((c) => this.infoTablero[c].isDoor);
    //   const bfsRooms = bfsDoors.map((c) => this.infoTablero[c].roomName);
    //   const bfsRoomsCells = this.infoTablero
    //     .filter((c) => bfsRooms.includes(c.roomName))
    //     .map((c) => c.idx);

    //   bfsRoomsCells.forEach((c) => (newPrev[c] = true));

    // this.setCeldasOptions(newPrev);
    

  }
  setCeldasOptions(celdasOptions: boolean[]): void {
    this.celdasOptionsSubject.next(celdasOptions);
  }

  setPlayerPositions(playerPositions: number[]): void {
    this.playerPositionsSubject.next(playerPositions);
  }
  
  getPlayerPositions(): number[] {
    return this.playerPositionsSubject.getValue();
  }

}
