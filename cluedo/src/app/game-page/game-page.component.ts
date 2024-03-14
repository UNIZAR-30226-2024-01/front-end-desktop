import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { ChatComponent } from '../chat/chat.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [RouterOutlet,
    LoginPageComponent,
    GamePageComponent,
    ChatComponent,
    TarjetaComponent, ToolbarComponent],
  templateUrl: '../../../../../front-end-shared/css/Tablero/Tablero.css',
})
export class GamePageComponent {
  constructor(private router: Router) { }
  title = 'cluedo';
}
