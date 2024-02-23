import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableCellComponent } from '../table-cell/table-cell.component';
import { TableHeadComponent } from '../table-head/table-head.component';
import { TableHeaderCellComponent } from '../table-header-cell/table-header-cell.component';
import { TableRowComponent } from '../table-row/table-row.component';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule, TableCellComponent, TableHeadComponent, TableHeaderCellComponent, TableRowComponent],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  desplegable: boolean = false;
  
  style = { right: this.desplegable ? '0px' : '-20%' };

    toggleDesplegable() {
    this.desplegable = !this.desplegable;
    this.style = { right: this.desplegable ? '0px' : '-20%' };
  }
}
