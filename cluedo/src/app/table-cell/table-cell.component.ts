import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-cell.component.html',
  styleUrl: '../../../../../front-end-shared/css/Tarjeta/table-cell.css',
})
export class TableCellComponent implements OnInit {
  @Input() state: number=1;
  texts: string[] = ['', '❌', '✔', '❔'];
  colors: string[] = ['#ffffff', '#995555', '#559955', '#555599'];
  text: string = '';

  style = {};

  ngOnInit() {
    this.updateText();
  }

  handleClick() {
    const index = this.texts.indexOf(this.text);
    this.text = this.texts[(index + 1) % this.texts.length];
    this.updateStyle();
  }

  updateText() {
    this.text = this.texts[this.state];
    this.updateStyle();
  }

  updateStyle() {
    const colorIndex = this.texts.indexOf(this.text);
    this.style = { 'background-color': this.colors[colorIndex] };
  }
}