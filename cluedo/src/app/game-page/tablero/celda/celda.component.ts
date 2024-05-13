import { Component, Input } from '@angular/core';
import { Celda } from './celda.interface'; 
import { TurnoService } from '../../../servicios/servicio-turno/turno.service';
import { GameService } from '../../../servicios/servicio-game/game.service';
import { CeldasService } from '../../../servicios/servicio-celdas/celdas.service';
import { SocketService } from '../../../servicios/servicio-socket/socket.service';
//import * as infoTablero from '../../../../assets/infoTablero.json';
import { OnChanges, SimpleChanges } from '@angular/core';
import { consumerMarkDirty } from '@angular/core/primitives/signals';
const { infoTablero, casillasPorHabitacion } = require('../../../../../../../front-end-shared/infoTablero.js');


@Component({
  selector: 'app-celda',
  standalone: true,
  imports: [],
  templateUrl: './celda.component.html',
  styleUrl: '../../../../../../../front-end-shared/css/Game/Tablero/Celda.css'
})

export class CeldaComponent {
  @Input() propiedadesCelda!: Celda;
  @Input() fila!: number;
  @Input() columna!: number;
  index = this.fila * 24 + this.columna;
  clase : string = "";
  parteTurno: string | undefined;
  playerPositions: number[] | undefined; 
  celdasOptions: boolean[] | undefined; 
  characters :  string[] | undefined;
  estiloCelda = {
    width: 26,
    height: 26,
    fill: "black"
  };
  
  constructor(public gameService: GameService,private turnoService: TurnoService, private celdasService: CeldasService, private socketService: SocketService) {
   this.turnoService.parteTurno$.subscribe(parteTurno => {
     // this.parteTurno = this.turnoService.getParteTurno();
     this.parteTurno = parteTurno;
    });
    this.celdasService.playerPositions$.subscribe(playerPositions => {
      this.playerPositions = playerPositions;
    });
    this.celdasService.celdasOptions$.subscribe(celdasOptions => {
      this.celdasOptions = celdasOptions;
    });
    this.characters = this.gameService.personajes;
    this.celdasService.celdasOptions$.subscribe(options => {
      // Asigna el valor de celdasOptions
      this.celdasOptions = options;
    });
  }  
  
  getIsRoom() {return this.propiedadesCelda.isRoom;}
  getRoomName() {return this.propiedadesCelda.roomName;}
  getIsStartingCell() {
    // console.log("playerPositions", this.playerPositions, "y soy", this.index);
    return this.playerPositions?.includes(this.index);
  }
  getIsWalkable() {return this.propiedadesCelda.isWalkable;}
  getIsDoor() {return this.propiedadesCelda.isDoor;}
  getIdx() {return this.propiedadesCelda.idx;}
  getFila() {return this.fila;}
  getColumna() {return this.columna;}
  private isMyTurn() : boolean {
    return this.gameService.getUsername() === this.turnoService.getTurnoOwner();
  } 


  ngOnInit() {
    this.estilarCelda();
    this.anadirClase();
    this.characters = this.gameService.personajes;
    this.index = this.fila * 24 + this.columna;
    
    // console.log("mi fila", this.fila);
    if(this.playerPositions?.includes(this.index)){
      // console.log('Vector playerPositions:', this.playerPositions);
      if (this.playerPositions !== undefined) {
        console.log('soy',this.characters[this.playerPositions?.indexOf(this.index)] );
        this.estiloCelda.fill = this.player2color(this.characters[this.playerPositions?.indexOf(this.index)])
        console.log('con color', this.estiloCelda.fill);
      }
      
    }
  }

  getcellDisplay():string{
    let cellDisplay = '';
    if ( this.playerPositions && this.playerPositions.includes(this.index)) {
      const player_idx = this.playerPositions.indexOf(this.index);
      if (!this.characters || !this.characters[player_idx]) return '';
      cellDisplay = this.characters[player_idx].split(' ')[1].charAt(0).toUpperCase();
    }
   // console.log("El nombre de cellDisplay es :", cellDisplay);
    return cellDisplay;
  }

 
  getFillStyle():string{
    // Your logic here...
    // console.log("por lo menos entra", this.playerPositions);
    if (this.playerPositions !== undefined) {
    //  console.log('Vector characters:', this.characters);
      if( this.gameService.personajes !== undefined) {
        // console.log('soy',this.gameService.personajes[this.playerPositions?.indexOf(this.index)] , "cin index", this.index);
        return this.player2color(this.gameService.personajes[this.playerPositions?.indexOf(this.index)]);
      }
    }
    return 'black';
  }

  handleClick() {
    if (this.celdasOptions && !this.celdasOptions[this.index]) return;
    if (this.turnoService.getParteTurno()!="elegir-casilla") return;
    const updatedVector = this.playerPositions;

    //DE MOMENTO LO QUITO PARA PROBAR LO DEMAS(SIN BACKEND NO VA)
    // if (!this.celdasOptions[this.index]){
    //  console.log("esta no vale");
    // return;}
     console.log("elijo fila", this.index);

    if (updatedVector !== undefined && this.characters !== undefined) {
      // const character = this.gameService.getPersonajeUsuario();
      // const indexCharacter= this.characters.indexOf(character);
      
      const usernames = this.gameService.getUsernames();
      console.log("usernames",usernames);
      const playerIdx = usernames.indexOf(this.gameService.getUsername());
      const character = this.characters[playerIdx];
      console.log("playerIdx",playerIdx);
      console.log("character",character);
      updatedVector[playerIdx] = this.index;
      console.log("estan definidos, este es el nuevo vector", updatedVector);
      this.celdasService.setPlayerPositions(updatedVector);
      this.estiloCelda.fill = this.player2color(character)
      this.celdasService.restartCeldas();

      this.gestionarTurno(this.index,true);

      return;
      
    }
    // if ( this.getIsDoor() || this.getIsRoom()) {
    //   let cells = this.casillasPorHabitacion[this.infoCell.roomName - 1].cells;
    //   cells = cells.filter((c) => !this.playerPositions.includes(c));
    //   const randomCell = cells[Math.floor(Math.random() * cells.length)];
    //   this.handleClickOnCell(randomCell, false);
    //   setTimeout(() => {
    //     this.setParteTurno('elegir-pregunta');
    //   }, 2000);
    //   return;
    // }
    
    // if (this.playerPositions.includes(this.index)) return;
    // this.handleClickOnCell(this.index, true);
    // setTimeout(() => {
    //   this.setParteTurno('espera-resto');
    // }, 2000);
  }

  private gestionarTurno(idx:number , fin:boolean): void {
    if(infoTablero[idx].isRoom || infoTablero[idx].isDoor) {
      console.log("El jugador ha entrado en una habitación");
      let { cells } = casillasPorHabitacion[infoTablero[idx].roomName - 1];
      cells = cells.filter((c: any) => !(this.playerPositions ?? []).includes(c));
      // cells.remove((c) => playerPositions.includes(c)); // eliminar las casillas ya ocupadas
      const randomCell = cells[Math.floor(Math.random() * cells.length)];
      setTimeout(() => {
        console.log("cambio la parte del tunro");
        this.socketService.gameLogicTurnoMovesTo(this.socketService.socket, this.gameService.getUsername(), randomCell, false);
        this.turnoService.setDados(0);
        this.turnoService.setParteTurno('elegir-pregunta');
      }, 2000);
    } else {
      console.log("El jugador ha entrado en una casilla normal");

      setTimeout(() => {
        console.log("cambio la parte del tunro");
        this.celdasService.restartCeldas();
        this.socketService.gameLogicTurnoMovesTo(this.socketService.socket, this.gameService.getUsername(), idx, fin);
        this.turnoService.setDados(0);
        this.turnoService.setParteTurno('espera-resto');
      }, 2000);
    }
  }

  private esUnaHabitacion(): boolean {
    return infoTablero[this.index].isRoom;
  }
  
  anadirClase():string {
    if (this?.getIsRoom()) {
      this.clase = "room room-" + this.getRoomName();
    } else if (!this?.getIsWalkable()) {
      this.clase = "invalid";
    } else {
      this.clase = "celda ";
      if (this.fila % 2 === 0) {
        this.clase += this.columna % 2 === 0 ? "dark" : "light";
      } else {
        this.clase += this.columna % 2 === 0 ? "light" : "dark";
      }

      if (this.getIsStartingCell()) {
        this.clase += " start start-" + this.getIsStartingCell();
      }
    }
      if (this.celdasOptions){this.index
        if( this.celdasOptions[this.index] && this.isMyTurn()) {
        // console.log("celda seleccionable", this.index);
          this.clase += " selected";
        } else { 
          // remove " selected" from this.clase if it's there
          this.clase = this.clase.replace(" selected", "");
        }
      }

    return this.clase;
    // this.clase += " selected";
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['celdasOptions'] && this['celdasOptions']) {
      if (this['celdasOptions'][this.index]) {
        // console.log("celda seleccionable", this.index);
        this.clase += " selected";
      } else {
        // remove " selected" from this.clase if it's there
        this.clase = this.clase.replace(" selected", "");
      }
    }
  }

  
  estilarCelda() {
    if (this?.getIsRoom() || !this?.getIsWalkable()) {
      this.estiloCelda.width += 2;
      this.estiloCelda.height += 2;
    }
  }

  getRotation() {
    switch(this.getIsDoor()) {
      case "u":
        return 270;
      case "d":
        return 90;
      case "l":
        return 180;
      case "r":
        return 0;
      default:
        return -1;
    }
  }

  player2color(player: string) {
    switch (player) {
      case 'mr SOPER':
        return '#80b37e';
      case 'miss REDES':
        return '#fcfd7f';
      case 'mr PROG':
        return '#7fd2e7';
      case 'miss FISICA':
        return '#fdfdfd';
      case 'mr DISCRETO':
        return '#dea9fb';
      case 'miss IA':
        return '#fc7e7e';
      default:
        return 'black';
    }
  }
  

}