import { Component, Input } from '@angular/core';
import { Celda } from './celda.interface'; 
import { TurnoService } from '../../../servicios/servicio-turno/turno.service';
import { GameService } from '../../../servicios/servicio-game/game.service';
import { CeldasService } from '../../../servicios/servicio-celdas/celdas.service';
import * as infoTablero from '../../../../assets/infoTablero.json';


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
    fill: "red"
  };
  
  constructor(public gameService: GameService,private turnoService: TurnoService, private celdasService: CeldasService) {
   this.turnoService.parteTurno$.subscribe(parteTurno => {
     // this.parteTurno = this.turnoService.getParteTurno();
    });
    this.celdasService.playerPositions$.subscribe(playerPositions => {
      this.playerPositions = playerPositions;
    });
    this.characters = this.gameService.personajes;
    this.celdasService.celdasOptions$.subscribe(options => {
      // Asigna el valor de celdasOptions
      this.celdasOptions = options;
    });
  }
  getIsRoom() {return this.propiedadesCelda.isRoom;}
  getRoomName() {return this.propiedadesCelda.roomName;}
  getIsStartingCell() {return this.playerPositions?.includes(this.index);}
  getIsWalkable() {return this.propiedadesCelda.isWalkable;}
  getIsDoor() {return this.propiedadesCelda.isDoor;}
  getIdx() {return this.propiedadesCelda.idx;}
  getFila() {return this.fila;}
  getColumna() {return this.columna;}

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
  handleClick() {
    // if (!this.celdasOptions[this.index]) return;
    const updatedVector = this.playerPositions;

    //DE MOMENTO LO QUITO PARA PROBAR LO DEMAS(SIN BACKEND NO VA)
    // if (!this.celdasOptions[this.index]){
    //  console.log("esta no vale");
    // return;}

    if (updatedVector !== undefined && this.characters !== undefined) {
      const character = this.gameService.getPersonajeUsuario();
      const indexCharacter= this.characters.indexOf(character)
      updatedVector[indexCharacter] = this.index;
      this.celdasService.setPlayerPositions(updatedVector);
      this.estiloCelda.fill = this.player2color(character)
      setTimeout(() => {
        this.turnoService.setParteTurno('elegir-pregunta');
      }, 2000);
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
  
  anadirClase() {
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
    if (this.celdasOptions && this.celdasOptions[this.index]) {
      this.clase += " selected";
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