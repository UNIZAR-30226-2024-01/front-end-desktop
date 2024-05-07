import { Component, OnInit } from '@angular/core';
import { TemporizadorComponent } from '../temporizador/temporizador.component';
import { DadosComponent } from '../dados/dados.component';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { CommonModule } from '@angular/common';
import { TurnoService } from '../servicios/servicio-turno/turno.service';
import { GameService } from '../servicios/servicio-game/game.service';


@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  standalone:true, 
  styleUrls: [
    './turno.component.css',  ],
    imports: [TemporizadorComponent,DadosComponent,CarruselComponent,
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
  
  constructor(private turnoService: TurnoService, private gameService: GameService) {
    this.turnoService.parteTurno$.subscribe(parteTurno => {
      this.parteTurno = this.turnoService.getParteTurno();
    });
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
    //mandar a la BD
    this.dice=0;  
  }

  ngOnInit(): void {
    // this.desplegablesContext.setChatDesplegado(false);
    // this.desplegablesContext.setTarjetaDesplegado(false);
    // this.desplegablesContext.setCartasDesplegado(false);
    // this.desplegablesContext.setOpcionesDesplegado(false);
    console.log("Turno iniciado");
    // this.turnoService.setParteTurno('es-tu-turno');

    
    // this.iniciarTemporizador();
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
  setGunSelected(value:string):void {this.gunSelected=value
    console.log("product selected", value);
  }
  setRoomSelected(value:string):void {this.roomSelected=value
    console.log("product selected", value);
  }

  handleDiceRoll(totalValue: number): void {
    this.dice = totalValue;
    console.log("Dados lanzados, valor: " + totalValue);
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
