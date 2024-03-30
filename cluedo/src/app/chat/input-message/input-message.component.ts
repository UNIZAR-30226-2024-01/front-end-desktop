import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { GifsModule } from '../gifs/gifs.module';

@Component({
  selector: 'app-input-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-message.component.html',
  styleUrl: '../../../../../../front-end-shared/css/Game/Chat/input-message.css'
})
export class InputMessageComponent {
  @Output() mensajeEnviado = new EventEmitter<string>();
  showGifPicker: boolean = false;
  message: string = '';
  gifs: any[] = [];
  query: string = '';

  constructor() { }

  // Cuando se pulsa el botón de Enviar, se emite un evento mensjeEnviado
  enviarMensaje() {
    if (this.message === '') {
      return;
    }
    this.mensajeEnviado.emit(this.message);
    this.message = '';
  }

  onSubmit() {
    this.enviarMensaje();
  }

  setShowGifPicker(show: boolean) {
    this.showGifPicker = show;
  }

}
