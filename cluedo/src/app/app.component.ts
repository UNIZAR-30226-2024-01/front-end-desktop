import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { ChatComponent } from './chat/chat.component';
import { GamePageComponent } from './game-page/game-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    LoginPageComponent,
    GamePageComponent,
    ChatComponent,
    TarjetaComponent, ToolbarComponent,
    AppRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'cluedo';
}
