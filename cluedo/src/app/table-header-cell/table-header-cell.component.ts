import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-header-cell',
  standalone:true,
  template: `
    <th>
      <input type="text" [maxLength]="maxChars" [value]="text"/>
    </th>
  `,
  styles: []
})
export class TableHeaderCellComponent {
  @Input() maxChars: number = 4;
  @Input() text: string = "";
}
