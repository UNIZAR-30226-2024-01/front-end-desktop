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
import { GameService } from '../servicios/servicio-game/game.service';

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
  constructor(private router: Router, public gameService: GameService) { }
  title = 'cluedo';

  personajes: string[] = ["mr SOPER", "mr REDES", "mr PROG", "mr FISICA", "mr DISCRETO", "mr IA"];

  //Funcion que devuelve si se esta produciendo un evento, por ahora solo esta el caso de selección de personaje
  IsAnEventOccurring(): boolean {
    if (this.gameService.userSelectedACharacter) {
      return false;
    } else {
      return true;
    }
  } 

  //Funcion que maneja el evento de ok de los dados
  finDados(event: number): void {
    this.gameService.siguienteTurno();
  }

  
}
