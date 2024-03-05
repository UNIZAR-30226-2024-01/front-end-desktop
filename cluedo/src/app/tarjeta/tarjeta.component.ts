import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DesplegableComponent } from '../desplegable/desplegable.component';
import { TableCellComponent } from '../table-cell/table-cell.component';
import { TableHeadComponent } from '../table-head/table-head.component';
import { TableRowComponent } from '../table-row/table-row.component';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule, 
            TableCellComponent, TableHeadComponent, TableRowComponent,
            DesplegableComponent],
  templateUrl: './tarjeta.component.html',
  styleUrl: '../../../../../front-end-shared/css/Tarjeta/Tarjeta.css'
})
export class TarjetaComponent {
  desplegado: boolean = false;
  nombreComponente: string ="tarjeta";

  // Variables para el header
  maxCharsHeader: number = 4;
  textHeader: string = "";


  // Método para cambiar el estado de la variable "desplegado" para desplazar el chat
  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }
}
