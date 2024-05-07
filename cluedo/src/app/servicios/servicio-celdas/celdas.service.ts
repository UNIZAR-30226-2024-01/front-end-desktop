import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TurnoService } from '../servicio-turno/turno.service';
import { GameService } from '../servicio-game/game.service';
//  import { cellsClose } from '../../../../bfs.mjs';
import * as infoTablero from '../../../assets/infoTablero.json';
import { Celda } from '../../game-page/tablero/celda/celda.interface'; 


declare const require: any;
const {
 cellsClose
} = require('../../../../bfs.mjs');

@Injectable({
  providedIn: 'root'
})
export class CeldasService {
  tablero: any[] = infoTablero.infoTablero2;    // obtenemos la información del JSON infoTablero.json
  private celdasOptionsSubject = new BehaviorSubject<boolean[]>([]);
  celdasOptions$ = this.celdasOptionsSubject.asObservable();
  private dados: number | undefined;
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
    const usernames = this.gameService.getUsernames();
    const playerIdx = usernames.indexOf(this.gameService.getUsername());
    const pp = this.playerPositions?.[playerIdx];
    if (!pp) return;

    const bfs = cellsClose(pp, this.dados, this.playerPositions);
    bfs.filter();

       const newPrev = this.celdasOptions;
      if (newPrev!=undefined){

        bfs.forEach((c:any) => (newPrev[c] = true)); 
          this.playerPositions.forEach((c:any) => (newPrev[c] = false));
          const bfsDoors = bfs.filter((c:any) => this.tablero[c].isDoor);
          const bfsRooms = bfsDoors.map((c:any) => this.tablero[c].roomName);
          const bfsRoomsCells = this.tablero.filter((c:any) => bfsRooms.includes(c.roomName))
            .map((c:any) => c.idx);
          bfsRoomsCells.forEach((c:any) => (newPrev[c] = true));
        this.setCeldasOptions(newPrev);
      }
    

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
