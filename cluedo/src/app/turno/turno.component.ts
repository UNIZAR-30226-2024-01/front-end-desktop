import { Component, OnInit } from '@angular/core';
import { TemporizadorComponent } from '../temporizador/temporizador.component';
import { DadosComponent } from '../dados/dados.component';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { CommonModule } from '@angular/common';
import { TurnoService } from '../servicios/servicio-turno/turno.service';


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

  constructor(private turnoService: TurnoService) {
    this.turnoService.parteTurno$.subscribe(parteTurno => {
      this.parteTurno = parteTurno;
    });
   }

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
    // this.iniciarTemporizadorCasilla();
    this.turnoService.setParteTurno('elegir-casilla');
  }

  iniciarTemporizador(): void {
    setTimeout(() => {
      // this.parteTurno = 'dados';
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
