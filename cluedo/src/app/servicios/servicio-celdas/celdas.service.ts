import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TurnoService } from '../servicio-turno/turno.service';
import { GameService } from '../servicio-game/game.service';
//  import { cellsClose } from '../../../../bfs.mjs';
//import * as infoTablero from '../../../assets/infoTablero.json';
import infoTablero from '../../../assets/infoTablero.json';

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
  private dados: number = 0;
  private playerPositionsSubject = new BehaviorSubject<number[]>([]);
  playerPositions$ = this.playerPositionsSubject.asObservable();
  playerPositions : number[] |undefined;
  celdasOptions : boolean[] |undefined;
  ngOnInit(): void {
    this.updateCeldasOptions(this.dados?this.dados:0);
  } 
  constructor(private turnoService: TurnoService, private gameService: GameService) {
    // Inicializar los BehaviorSubject con los valores predeterminados
    console.log("Iinicializando todo");
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
    console.log("llenando celdasOptions");
    
  }
  restartCeldas(): void {
    this.celdasOptions = Array(24 * 24).fill(false);
    this.playerPositions = [];
  }
  updateCeldasOptions(dados:number): void {
    if (!this.turnoService.dados$ || !this.gameService.getUsernames() || !this.playerPositions ) {
      console.log("updateCeldasOptions: datos incompletos", this.turnoService.dados$, this.gameService.getUsernames(), this.playerPositions, this.dados);
      return;}
    const usernames = this.gameService.getUsernames();
    console.log("usernames",usernames);
    const playerIdx = usernames.indexOf(this.gameService.getUsername());
    console.log("playerIdx",playerIdx);
    // const pp = this.playerPositions?.[playerIdx];
    const pp = this.playerPositions?.[playerIdx];
    console.log("pp",pp);
    if (!pp) return;

    const bfs = cellsClose(pp, dados, this.playerPositions);
    console.log("llega aqui", bfs);
    // bfs.filter();

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
