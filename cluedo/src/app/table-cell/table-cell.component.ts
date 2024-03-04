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
  NUM_ESTADOS: number = 4;

  @Input() state: number=0;  


  texts: string[] = ['', '❌', '✔', '❔'];
  colors: string[] = ['#ffffff', '#995555', '#559955', '#555599'];
  estado: number = 0;
  text: string = '';

  style = {};

  ngOnInit() {
    this.updateText();
  }

  cambiarEstado() {
    this.estado = this.estado + 1 % this.NUM_ESTADOS;
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
