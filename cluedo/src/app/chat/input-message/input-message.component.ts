import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-message',
  standalone: true,
  imports: [],
  templateUrl: './input-message.component.html',
  styleUrl: '../../../../../../front-end-shared/css/input-message.css'
})
export class InputMessageComponent {
  @Output() mensajeEnviado = new EventEmitter<string>();

  // Cuando se pulsa el botón de Enviar, se emite un evento mensjeEnviado
  enviarMensaje(mensaje: string) {
    this.mensajeEnviado.emit(mensaje);
  }

}
