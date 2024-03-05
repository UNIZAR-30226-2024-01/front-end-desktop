import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DesplegableComponent } from '../desplegable/desplegable.component';
import { TableCellComponent } from '../table-cell/table-cell.component';

// Codificación para el estado de las celdas
enum EstadoCelda {
  INDEFINIDO = 0,
  OK = 1,
  CRUZ = 2,
  INTERROGACION = 3
}

// Creamos un tipo para los componentes de la matriz tabla
interface Celda {
  estado: EstadoCelda;
}

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule, 
            TableCellComponent, 
            DesplegableComponent],
  templateUrl: './tarjeta.component.html',
  styleUrl: '../../../../../front-end-shared/css/Tarjeta/Tarjeta.css'
})
export class TarjetaComponent {
  constructor() {
    this.inicializarTabla();
  }

  // Variables para el desplegable
  desplegado: boolean = false;
  nombreComponente: string ="tarjeta";

  // Variables para el header
  maxCharsHeader: number = 4;
  textHeader: string = "";

  // Tabla
  numEstados = Object.keys(EstadoCelda).length / 2; //Para saber cuantos estados hay
  numFilas: number = 21;
  numColumnas: number = 7;
  tabla: Celda[][] = [];
  
  inicializarTabla() {
    for (let i = 0; i < this.numFilas; i++) {
      this.tabla[i] = [];
      for (let j = 0; j < this.numColumnas; j++) {
        this.tabla[i][j] = { estado: EstadoCelda.INDEFINIDO };
      }
    }
  }

  clickFila(numFila: number){
    for (let j = 0; j < this.numColumnas; j++) {
      const celda = this.tabla[numFila][j];
      celda.estado = (celda.estado + 1) % this.numEstados;
    }
    console.log(this.tabla);
  }

  // Método para cambiar el estado de la variable "desplegado" para desplazar el chat
  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }
}
