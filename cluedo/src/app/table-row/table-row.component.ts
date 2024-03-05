import { Component, Input } from '@angular/core';
import { TableCellComponent } from '../table-cell/table-cell.component';

@Component({
  selector: 'app-table-row',
  standalone: true,
  imports :[TableCellComponent],
  templateUrl: './table-row.component.html',
  styleUrl: '../../../../../front-end-shared/css/Tarjeta/table-row.css',
})

export class TableRowComponent {
  @Input() name: string;
  tachado: boolean = false;

  constructor() {
    // Inicializa el nombre desde el componente padre
    this.name = '';
  }

  handleClick() {
    this.tachado = !this.tachado;
  }
}
