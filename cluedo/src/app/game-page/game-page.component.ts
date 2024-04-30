import { Component, OnInit } from '@angular/core';
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
import { SocketService } from '../servicios/servicio-socket/socket.service';
import { Router } from '@angular/router';
import { GameService } from '../servicios/servicio-game/game.service';
import { environment } from "../../environments/environment"; 

const BACKEND_URL = environment.apiUrl;

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
export class GamePageComponent implements OnInit{
  idGame: string | undefined;

  constructor(private router: Router, public gameService: GameService, private socketService: SocketService) { }
  ngOnInit() {
    this.idGame = localStorage.getItem('partida_actual') ?? undefined;
    if (this.idGame === undefined) {
      this.router.navigate(['/home-page']);
    }
    this.checkGameExists();
     this.socketService.setUsername(this.gameService.getUsername() ?? 'anonymous');
     this.socketService.setGroup(this.idGame ?? '0');
     //this.socketService.connect();
  }
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
  checkGameExists() {
    console.log('Checking if game exists');
    const url = BACKEND_URL + '/getGame?idGame=' + this.idGame;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((data) => {
      const am_i_in = data.areAvailable.includes((this.gameService.getUsername()));
      if (data.exito === true || am_i_in) {
        console.log('Game exists');
      } else {
        alert('No se ha podido unirse a la partida. Inténtalo de nuevo.');
        this.router.navigate(['/']);
      }
    });
  }

  
}
