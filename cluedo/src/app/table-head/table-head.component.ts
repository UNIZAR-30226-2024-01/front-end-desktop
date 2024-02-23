import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-head',
  standalone: true,
  template: `
    <tr class="titulos">
      <th>{{ title }}</th>
    </tr>
  `,
  styles: []
})
export class TableHeadComponent {
  @Input() title: string = "";
}
