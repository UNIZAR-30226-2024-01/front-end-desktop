import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-header-cell',
  standalone:true,
  templateUrl: './table-header-cell.component.html',
  styleUrl: '../../../../../front-end-shared/css/Tarjeta/table-header-cell.css'
})
export class TableHeaderCellComponent {
  @Input() maxChars: number = 4;
  @Input() text: string = "";
}
