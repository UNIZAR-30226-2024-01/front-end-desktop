import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { ChatComponent } from './chat/chat.component';
import { AudioComponent } from './audio/audio.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ChatComponent,
    TarjetaComponent, ToolbarComponent,MatToolbarModule,
    AudioComponent],
  templateUrl: './app.component.html',
  styleUrl: '../app.component.css'
})

export class AppComponent {
  title = 'cluedo';
}
