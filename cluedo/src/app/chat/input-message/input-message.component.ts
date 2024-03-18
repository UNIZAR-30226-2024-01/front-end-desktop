import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-message.component.html',
  styleUrl: '../../../../../../front-end-shared/css/game/Chat/input-message.css'
})
export class InputMessageComponent {
  @Output() mensajeEnviado = new EventEmitter<string>();
  showGifPicker: boolean = false;
  message: string = '';

  // Cuando se pulsa el botón de Enviar, se emite un evento mensjeEnviado
  enviarMensaje(mensaje: string) {
    this.mensajeEnviado.emit(mensaje);
  }

  setShowGifPicker(show: boolean) {
    this.showGifPicker = show;
  }

}
