import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-head',
  standalone: true,
  templateUrl: './table-head.component.html',
  styleUrl: '../../../../../front-end-shared/css/Tarjeta/table-head.css'
})
export class TableHeadComponent {
  @Input() title: string = "";
}
