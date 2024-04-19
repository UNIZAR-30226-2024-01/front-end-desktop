import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { ChatComponent } from '../chat/chat.component';
import { DadosComponent } from '../dados/dados.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TableroComponent } from './tablero/tablero.component';
import { CartasDesplegableComponent } from '../cartas-desplegable/cartas-desplegable.component';
import { TurnoComponent } from '../turno/turno.component';
import { MainTableroComponent } from './main-tablero/main-tablero.component';
import { CharacterSelectionComponent } from './character-selection/character-selection.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [RouterOutlet,
    LoginPageComponent,
    GamePageComponent,
    DadosComponent,
    ChatComponent,
    TableroComponent, MainTableroComponent,
    TarjetaComponent, ToolbarComponent,
    CartasDesplegableComponent,
    TurnoComponent,
    CharacterSelectionComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './../../../../../front-end-shared/css/Game/Game.css',
})
export class GamePageComponent {
  constructor(private router: Router) { }
  title = 'cluedo';

  personajes: string[] = ["mr SOPER", "mr REDES", "mr PROG", "mr FISICA", "mr DISCRETO", "mr IA"];
}
