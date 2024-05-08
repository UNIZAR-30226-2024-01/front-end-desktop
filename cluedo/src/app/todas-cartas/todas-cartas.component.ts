import { Component } from '@angular/core';
import { CartasComponent } from '../cartas/cartas.component';

@Component({
  selector: 'app-todas-cartas',
  standalone: true,
  imports: [CartasComponent],
  templateUrl: './todas-cartas.component.html',
  styleUrl: './todas-cartas.component.css'
})
export class TodasCartasComponent {
  playerNames = [
    'mr soper', 'miss redes', 'mr prog', 'miss fisica', 'mr discreto', 'miss ia',
    'teclado', 'cable de red', 'cafe envenenado', 'router afilado', 'troyano', 'cd',
    'cafeteria', 'baños', 'recepcion', 'escaleras', 'biblioteca', 'laboratorio', 'despacho', 'aulas norte', 'aulas sur',
    'back', 'back', 'back', 'back', 'back', 'back'
  ];
}
