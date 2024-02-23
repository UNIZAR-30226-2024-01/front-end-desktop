import { Component } from '@angular/core';
import { TableCellComponent } from '../table-cell/table-cell.component';

@Component({
  selector: 'app-table-row',
  template: `
    <tr>
      <td class="elemento" (click)="handleClick()">{{ name }}</td>
      <app-table-cell [state]="tachado ? 1 : 0"></app-table-cell>
      <app-table-cell [state]="tachado ? 1 : 0"></app-table-cell>
      <app-table-cell [state]="tachado ? 1 : 0"></app-table-cell>
      <app-table-cell [state]="tachado ? 1 : 0"></app-table-cell>
      <app-table-cell [state]="tachado ? 1 : 0"></app-table-cell>
      <app-table-cell [state]="tachado ? 1 : 0"></app-table-cell>
      <app-table-cell [state]="tachado ? 1 : 0"></app-table-cell>
    </tr>
  `,
  standalone: true,
  imports :[TableCellComponent],
  styles: []
})
export class TableRowComponent {
  name: string;
  tachado: boolean = false;

  constructor() {
    // Inicializa el nombre desde el componente padre
    this.name = '';
  }

  handleClick() {
    this.tachado = !this.tachado;
  }
}
