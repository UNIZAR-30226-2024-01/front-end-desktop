import { Component, OnInit } from '@angular/core';
import { TemporizadorComponent } from '../temporizador/temporizador.component';
import { DadosComponent } from '../dados/dados.component';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  standalone:true, 
  styleUrls: [
    '../../../../../front-end-shared/css/Game/Turno/Turno.css',  ],
    imports: [TemporizadorComponent,DadosComponent,CarrouselComponent,
      CommonModule
    ]
})
export class TurnoComponent implements OnInit {
  parteTurno: string = '';
  dice: number = 0;

  constructor(
    // private desplegablesContext: DesplegablesContext,
    // private turnoContext: TurnoContext,
    // private gameInfoContext: GameInfoContext,
    // private socketContext: SocketContext
  ) {}

  ngOnInit(): void {
    // this.desplegablesContext.setChatDesplegado(false);
    // this.desplegablesContext.setTarjetaDesplegado(false);
    // this.desplegablesContext.setCartasDesplegado(false);
    // this.desplegablesContext.setOpcionesDesplegado(false);
    console.log("Turno iniciado");
    this.parteTurno = "es-tu-turno";
    this.iniciarTemporizador();
  }

  handleDiceRoll(totalValue: number): void {
    this.dice = totalValue;
    console.log("Dados lanzados, valor: " + totalValue);
    setTimeout(() => {
      this.parteTurno = "elegir-casilla";
    }, 2000);
  }

  iniciarTemporizador(): void {
    setTimeout(() => {
      this.parteTurno = 'dados';
    }, 2000);
  }
  // Agrega los listeners del socket aquí

}
