import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Socket } from 'socket.io-client';
import { SocketService } from '../servicios/servicio-socket/socket.service';
import { Inject } from '@angular/core';
import { GameService } from '../servicios/servicio-game/game.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatMenuModule,CommonModule,RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: '../../../../../front-end-shared/css/Game/NavbarGame.css'
})
export class ToolbarComponent {
pausarPartida(): void  {
  if (this.gameService.pausedGame) {
    this.socketService.continuar_partida();
    this.gameService.setPausedGame(false);
    this.gameService.setRequestedPause(false);
  } else if (this.gameService.requestedPause) {
    // Toast: la pausa ya está solicitada
  } else {
    this.socketService.pausar_partida();
    this.gameService.setRequestedPause(true);
    this.gameService.setPausedGame(false);
  }
}
constructor(private router: Router, private socketService: SocketService, public gameService: GameService)  {
   //Inicializar el usuario aquí si es necesario
   this.user=localStorage.getItem('username') ?? undefined;
}
abandonarPartida() {
  this.socketService.abandonar();
  localStorage.removeItem('partida_actual');
  this.router.navigate(['/home-page']);
}
  isOpen: boolean = false;
  user: string | undefined;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
