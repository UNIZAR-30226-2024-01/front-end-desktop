import { Component, Input } from '@angular/core';

interface roomStyle {
  left: string;
  top: string;
}

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [],
  templateUrl: './text.component.html',
  styleUrl: '../../../../../../../front-end-shared/css/Game/Tablero/Text.css'
})


export class TextComponent {
  @Input() idRoom!: number;
  @Input() nombre!: number;
  @Input() estilo!: roomStyle;

  
  
}
