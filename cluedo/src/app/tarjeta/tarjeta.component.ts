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
  styleUrls: ['../../../../../front-end-shared/css/Game/Tarjeta/Tarjeta.css',
              '../../../../../front-end-shared/css/Game/Tarjeta/table-cell.css',
              '../../../../../front-end-shared/css/Game/Tarjeta/table-head.css',
              '../../../../../front-end-shared/css/Game/Tarjeta/table-row.css',
              '../../../../../front-end-shared/css/Game/Tarjeta/table-header-cell.css']
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

  lastState: Celda[][] = [];
  rowInverted: boolean[] = [];

  // Método para poner todas las celdas en el estado "INDEFINIDO"
  private inicializarTabla() {
    for (let i = 0; i < this.numFilas; i++) {
      this.tabla[i] = [];
      this.lastState[i] = [];
      this.rowInverted[i] = false;
      for (let j = 0; j < this.numColumnas; j++) {
        this.tabla[i][j] = { estado: EstadoCelda.INDEFINIDO };
        this.lastState[i][j] = { estado: EstadoCelda.INDEFINIDO };
      }
    }
  }

  // Dado un estado de celda, devuelve el siguiente estado
  private siguienteEstado(estado: EstadoCelda) {
    return (estado + 1) % this.numEstados;
  }
  
 // Método para cambiar el estado de todas las celdas de una fila
  clickFila(numFila: number){
    const fila = this.tabla[numFila];

    if(this.rowInverted[numFila] === false){
      this.rowInverted[numFila] = true;
      for (let j = 0; j < this.numColumnas; j++) {
        const celda = fila[j];
        // Poner todo a cruz y copiar en lastState
        this.lastState[numFila][j].estado = celda.estado;
        celda.estado = EstadoCelda.CRUZ;
      }
    }  
    else{
      this.rowInverted[numFila] = false;
      for (let j = 0; j < this.numColumnas; j++) {
        const celda = fila[j];
        celda.estado = this.lastState[numFila][j].estado; // Restaurar el estado anterior
      }
    }
  }


  // Método para cambiar el estado de una celda dada
  clickCelda(numFila: number, numColumna: number) {
    console.log("click en celda " + numFila + ", " + numColumna);
    const celda = this.tabla[numFila][numColumna];
    celda.estado = this.siguienteEstado(celda.estado);
    this.rowInverted[numFila] = false;
  }

  // El valor index del @for no coincide con el índice de la tabla, por lo que necesitamos un método 
  // para obtener el índice correcto de la tabla
  obtenerIndexHeader(index: number, tipo: string){
    switch (tipo) {
      case "personajes":
        return index;
      case "armas":
        return index + this.personajes.length;
      case "lugares":
        return index + this.personajes.length + this.armas.length;
      default:
        return -1;
    }
  }

  // Método para obtener el estado de una celda
  obtenerEstado(numFila: number, numColumna: number) {
    return this.tabla[numFila][numColumna].estado;
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

