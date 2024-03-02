import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DesplegableComponent } from '../desplegable/desplegable.component';
import { TableCellComponent } from '../table-cell/table-cell.component';
import { TableHeadComponent } from '../table-head/table-head.component';
import { TableHeaderCellComponent } from '../table-header-cell/table-header-cell.component';
import { TableRowComponent } from '../table-row/table-row.component';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule, 
            TableCellComponent, TableHeadComponent, TableHeaderCellComponent, TableRowComponent,
            DesplegableComponent],
  templateUrl: './tarjeta.component.html',
  styleUrl: '../../../../../front-end-shared/css/Tarjeta.css'
})
export class TarjetaComponent {
  desplegado: boolean = false;

  // Método para cambiar el estado de la variable "desplegado" para desplazar el chat
  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }
}
