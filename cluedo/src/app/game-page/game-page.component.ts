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
import { TurnoService } from '../servicios/servicio-turno/turno.service';
import { environment } from "../../environments/environment"; 
import { io, Socket } from 'socket.io-client';

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

  constructor(private router: Router, public gameService: GameService, private socketService: SocketService, private turnoService: TurnoService) { }
  ngOnInit() {
    this.idGame = localStorage.getItem('partida_actual') ?? undefined;
    //console.log('idGame primero : ' + this.idGame);
    if (this.idGame === undefined) {
      this.router.navigate(['/home-page']);
    }
    const haveISelected= this.gameService.getUsernames().includes(localStorage.getItem('username') ?? '');
    console.log('Have I selected a character?', haveISelected);
    this.gameService.setCharacterSelection(haveISelected);
    this.checkGameExists();
    this.socketService.setUsername(this.gameService.getUsername() ?? 'anonymous');
    this.socketService.setGroup(this.idGame ?? '0');
    this.socketService.connect();
  }
  title = 'cluedo';

  personajes: string[] = ["mr SOPER", "mr REDES", "mr PROG", "mr FISICA", "mr DISCRETO", "mr IA"];

  //Funcion que devuelve si se esta produciendo un evento, por ahora solo esta el caso de selección de personaje

  startGame(): void { 
    this.gameService.setStarted(true);
    console.log('start game');
    this.socketService.startGame();
  }

  isMyTurn(): boolean {
    // falta poner que sea mi turno
    if (this.turnoService.getTurnoOwner() === localStorage.getItem('username')) {
      return true;
    } else {
      return false;
    }
  }
  // Funcion que maneja el evento de ok de los dados
  finDados(event: number): void {
    this.gameService.siguienteTurno();
  }
/*
* Deja entrar en una partida en los siguientes casos:
* - Ya estoy dentro de la partida (tengo un personaje seleccionado)
* - No ha habido error, no ha empezado todavía y no estoy en otra partida
* - Mis cookies son correctas (idGame adecuado)
* - Es una partida local y esta vacia de jugadores
*/
  checkGameExists() {
    console.log('Checking if game exists');
   // console.log('gameId:', this.idGame);
    const url = BACKEND_URL + '/getGame?idGame=' + this.idGame;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((data) => {
      const am_i_in = data.areAvailable.includes(localStorage.getItem('username'));
      if (
        am_i_in ||
        (data.exito && data.estado === '0' && data.tipo == 'o' && localStorage.getItem('partida_actual') === '') ||
        localStorage.getItem('partida_actual') == this.idGame ||
        (data.areAvailable?.every((item: string) => item === '') && data.estado === '0' && data.tipo === 'l')
      ) {
        // no ha habido error y no ha empezado todavía, o bien estoy en la partida y mis cookies son correctas
        localStorage.setItem('partida_actual', this.idGame ?? '');
        this.gameService.setPausedGame(data.estado === 'p');
        this.gameService.setRequestedPause(false);
        console.log('Game exists');
      } else {
        alert('No se ha podido unirse a la partida. Inténtalo de nuevo.');
        this.router.navigate(['/home-page']);
      }
    });
  }

  
}
