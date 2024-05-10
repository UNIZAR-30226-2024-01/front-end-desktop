import { Component, OnInit } from '@angular/core';
//import { TemporizadorComponent } from '../temporizador/temporizador.component';
import { DadosComponent } from '../dados/dados.component';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { CommonModule } from '@angular/common';
import { TurnoService } from '../servicios/servicio-turno/turno.service';
import { SocketService } from '../servicios/servicio-socket/socket.service';
import { GameService } from '../servicios/servicio-game/game.service';
import { CeldasService } from '../servicios/servicio-celdas/celdas.service';
const { infoTablero, casillasPorHabitacion,infoHabitaciones } = require('../../../../../front-end-shared/infoTablero.js');



@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  standalone:true, 
  styleUrls: [
    './turno.component.css',  ],
    imports: [/*TemporizadorComponent,*/DadosComponent,CarruselComponent,
      CommonModule
    ]
})
export class TurnoComponent implements OnInit {
  parteTurno: string = '';
  dice: number = 0;
  characterSelected:string="SOPER";
  gunSelected:string="TECLADO";
  roomSelected:string="CAFETERIA";
  personajes: string[] = ["SOPER", "REDES", "PROG", "FISICA", "DISCRETO", "IA"];
  armas: string[] = ["TECLADO", "CABLE", "TAZA", "ROUTER", "TROYANO", "DISCO"];
  lugares: string[] = ["CAFETERIA", "BANIO", "RECEPCION", "ESCALERAS", "BIBLIOTECA", "LABORATORIO", "DESPACHO", "AULANORTE", "AULASUR"];
  tipoPregunta: boolean = false;  // false = sospecha, true = acusacion


  constructor(public turnoService: TurnoService, public gameService: GameService, private celdasService: CeldasService,private socketService: SocketService) {
    this.turnoService.parteTurno$.subscribe(parteTurno => {
      this.parteTurno = parteTurno;
    });
    this.turnoService.dados$.subscribe(dados => {
      this.dice = dados;
    });
    // esto denberia ser asi, de momento no lo pongo porque no me va
    // this.personajes=gameService.personajes
    // this.armas=gameService.armas
    // this.lugares=gameService.lugares
   }

  handleClick(): void {
    // Agrega aquí la lógica que deseas ejecutar cuando se hace clic en el botón
    console.log("Se ha hecho clic en el botón 'Realizar sospecha🧐'");
    console.log("Se ha elegido el personaje", this.characterSelected);
    console.log("Se ha elegido el arma", this.gunSelected);
    console.log("Se ha elegido la habitacion", this.roomSelected);
    this.turnoService.setParteTurno('espera-resto');
    this.socketService.gameLogicTurnoAsksFor(this.socketService.socket, this.socketService.getUserName(), this.characterSelected, this.gunSelected, this.roomSelected, false);
    this.dice=0;  
  }

  ngOnInit(): void {
    // this.desplegablesContext.setChatDesplegado(false);
    // this.desplegablesContext.setTarjetaDesplegado(false);
    // this.desplegablesContext.setCartasDesplegado(false);
    // this.desplegablesContext.setOpcionesDesplegado(false);
    console.log("Turno iniciado");
    //this.setRoomSelected();
   // this.checkParteTurno();
    // this.turnoService.setParteTurno('es-tu-turno');

    
    this.iniciarTemporizador();
  }

  setRoomSelected(value:string):void {
    this.roomSelected=value
    console.log("product selected", value);
  }
  // setRoomSelected(): void {
  //   let room_idx = this.celdasService.playerPositions?.[this.gameService.usernames.indexOf(this.socketService.getUserName())] ?? 0;
  //   room_idx = infoTablero[room_idx].roomName - 1;
  //   const room_name = infoHabitaciones[room_idx]?.roomName;

  //   // quitar tildes a los nombres de las habitaciones
  //   const room_name_clean = room_name?.replace(/[áéíóú]/g, (char: string | number) => {
  //     return { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[char];
  //   });

  //   console.log('room_idx: ' + room_idx);
  //   this.roomSelected = room_name_clean?.toLowerCase() || 'sin habitacion';
  // }
  checkParteTurno(): void {
    console.log('Nueva parte del turno: ' + this.parteTurno);
    if (this.parteTurno == 'espera-resto') {
      this.turnoService.setParteTurno('');
      this.turnoService.setTurnoOwner('');
    }
  }

  finTemporizador(): void {
    this.turnoService.setParteTurno('espera-resto');
  }

  finTurnoPregunta(): void {
    this.turnoService.setParteTurno('espera-resto');
    const username_asking = this.socketService.getUserName();
    const is_final = this.tipoPregunta; // false = sospecha, true = acusacion final
    this.socketService.gameLogicTurnoAsksFor(this.socketService.socket, username_asking, this.characterSelected, this.gunSelected, this.roomSelected, is_final);
  }

  //Muestra el valor de los dados y lo resetea después de 2 segundos
  showDice(): number {
    setTimeout(() => {
      this.dice = 0;
    }, 2000);
    return this.dice;
  }
  

  toggleTipoPregunta(): void {
    // false = sospecha, true = acusacion
    this.tipoPregunta = !this.tipoPregunta;
  }

  get claseTipoPregunta(): string {
    return this.tipoPregunta ? 'acusacion' : 'sospecha';
  }
  vaAserTuTurno():void{
    // this.turnoService.setParteTurno('dados');
    // setTimeout(() => {
      // this.parteTurno = 'dados';
      this.turnoService.setParteTurno('es-tu-turno');
      this.iniciarTemporizador();

    // }, 2000);
    // this.temporizadorDados();
  }

  temporizadorDados():void{
    this.turnoService.setParteTurno('dados');
    this.iniciarTemporizador();
  }

  setCharacterSelected(value:string):void {
    console.log("product selected", value);
    this.characterSelected=value}
  setGunSelected(value:string):void {
    this.gunSelected=value
    console.log("product selected", value);
  }


  handleDiceRoll(totalValue: number): void {
    this.dice = totalValue;
    console.log("Dados lanzados, valor: " + totalValue);
    this.turnoService.setDados(totalValue);
    this.celdasService.updateCeldasOptions(totalValue);
    setTimeout(() => {
      // this.parteTurno = "elegir-casilla";
      this.turnoService.setParteTurno('elegir-casilla');
    }, 2000);
    // this.iniciarTemporizadorCasilla();
    
  }

  iniciarTemporizador(): void {
    setTimeout(() => {
      // this.parteTurno = 'dados';
      console.log("Daditos weon")
      this.turnoService.setParteTurno('dados');

    }, 2000);
  }
  // Agrega los listeners del socket aquí
  iniciarTemporizadorCasilla(): void {
    setTimeout(() => {
      // this.parteTurno = 'elegir-pregunta';
      this.turnoService.setParteTurno('elegir-pregunta');
      
    }, 4000);
  }
}
