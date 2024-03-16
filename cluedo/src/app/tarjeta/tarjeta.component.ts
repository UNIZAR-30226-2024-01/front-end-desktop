import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DesplegableComponent } from '../desplegable/desplegable.component';

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
            DesplegableComponent],
  templateUrl: './tarjeta.component.html',
  styleUrls: ['../../../../../front-end-shared/css/Tarjeta/Tarjeta.css',
              '../../../../../front-end-shared/css/Tarjeta/table-cell.css',
              '../../../../../front-end-shared/css/Tarjeta/table-head.css',
              '../../../../../front-end-shared/css/Tarjeta/table-row.css',
              '../../../../../front-end-shared/css/Tarjeta/table-header-cell.css']
})
export class TarjetaComponent {
  // Se ejecuta al crearse el componente
  constructor() {
    this.inicializarTabla();
  }

  // Variables para el desplegable
  desplegado: boolean = false;
  nombreComponente: string ="tarjeta";

  // Variables para el header
  maxCharsHeader: number = 4;
  textHeader: string = "";

  // Variables para la Tabla
  numEstados = Object.keys(EstadoCelda).length / 2; //Para saber cuantos estados hay
  numFilas: number = 21;
  numColumnas: number = 7;
  personajes: string[] = ["mr SOPER", "mr REDES", "mr PROG", "mr FISICA", "mr DISCRETO", "mr IA"];
  armas: string[] = ["teclado", "cable de red", "raton", "router", "troyano", "cd"];
  lugares: string[] = ["cafeteria", "baños", "recepcion", "escaleras", "biblioteca", "laboratorio", "despacho", "aulas norte", "aulas sur"];
  tabla: Celda[][] = [];

  // Método para poner todas las celdas en el estado "INDEFINIDO"
  private inicializarTabla() {
    for (let i = 0; i < this.numFilas; i++) {
      this.tabla[i] = [];
      for (let j = 0; j < this.numColumnas; j++) {
        this.tabla[i][j] = { estado: EstadoCelda.INDEFINIDO };
      }
    }
  }

  // Dado un estado de celda, devuelve el siguiente estado
  private siguienteEstado(estado: EstadoCelda) {
    return (estado + 1) % this.numEstados;
  }

  // Itera el estado de una celda solo entre INDEFINIDO y CRUZ
  private estadoContrario(estado: EstadoCelda) {
    if (estado !== EstadoCelda.CRUZ) {
      return EstadoCelda.CRUZ;
    } else {
      return EstadoCelda.INDEFINIDO;
    }
  }

  // Método para cambiar el estado de todas las celdas de una fila
  clickFila(numFila: number){
    for (let j = 0; j < this.numColumnas; j++) {
      const celda = this.tabla[numFila][j];
      celda.estado = this.estadoContrario(celda.estado);
    }
  }

  // Método para cambiar el estado de una celda dada
  clickCelda(numFila: number, numColumna: number) {
    const celda = this.tabla[numFila][numColumna];
    celda.estado = this.siguienteEstado(celda.estado);
  }

  // Método para obtener el símbolo del estado de una celda
  obtenerSimbolo(estado: EstadoCelda) {
    switch (estado) {
      case EstadoCelda.INDEFINIDO:
        return "";
      case EstadoCelda.OK:
        return "✔";
      case EstadoCelda.CRUZ:
        return "❌";
      case EstadoCelda.INTERROGACION:
        return "❔";
    }
  }

  // Método para obtener el color del estado de una celda
  obtenerColor(estado: EstadoCelda) {
    switch (estado) {
      case EstadoCelda.INDEFINIDO:
        return "#ffffff";
      case EstadoCelda.OK:
        return "#559955";
      case EstadoCelda.CRUZ:
        return "#995555";
      case EstadoCelda.INTERROGACION:
        return "#555599";
    }
  }

  // Método para cambiar el estado de la variable "desplegado" para desplazar el chat
  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }
}

