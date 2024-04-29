// home.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from "../../environments/environment"; 

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  standalone: true,
  styleUrls: ['../../../../../front-end-shared/css/Login/Login.css',
  '../../../../../front-end-shared/css/Home/Home.css', '../../../../../front-end-shared/css/Home/NavbarHome.css',
  "../../../../../front-end-shared/css/Home/ProgressBar.css"],
  imports: [
    CommonModule, RouterLink, HttpClientModule]
})

export class HomeComponent implements OnInit {
 // boardGame = boardGame;
  showGameModes: boolean = true;
  username: string = '';
isMenuOpen: any;
completed: number | undefined;
level: number | undefined;
width: string = "550px";
height: string = "70px";
color :string | undefined;
partida: string | undefined |null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    if (!localStorage.getItem('username')) {
      this.username = 'Invitado';
    } else {
      this.username = localStorage.getItem('username') as string;
      this.partida=localStorage.getItem('partida_actual') as string;
     this.partida = this.partida === "undefined" ? null : this.partida;
    }
    this.obtainXP().then(xp => {
      const lvl = this.calculateLevel(xp);
      this.level = lvl;
      this.calculateXP(lvl, xp);
    });
    this.completed = this.completed === undefined ? 0 : this.completed;
    this.level = this.level === undefined ? 0 : this.level;
  }
  async obtainXP(): Promise<number> {
    const username = localStorage.getItem('username');
    
    const url = `http://localhost:3000/obtainXP?username=${username}`;
    //console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    if (data.XP === undefined) {
      return 0;
    }
    return data.XP;
  }
  calculateLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp));
  }
  calculateXP(level: number, xp: number): void {
    const percentage = Math.trunc((Math.sqrt(xp) - level) * 100);
    this.completed = percentage;
    this.color = this.getColor();
  }



  async newGameClick(gameMode: string) {
    if (gameMode === '') {
      alert('Por favor, selecciona un modo de juego.');
      return;
    }
  
    const url = BACKEND_URL + '/createGame';
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          type: gameMode,
        })
      });
      const data = await response.json();
      if (data && data.exito === true) {
        const idGame = data.id_partida;
        localStorage.setItem('partida_actual', idGame);
        this.router.navigate(['/game-page/' + idGame]);
      } else {
        alert('No se ha podido crear la partida. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async useJoinGameClick() {
    let execute = true;
  
    if (this.partida) {
      this.router.navigate(['/game-page/'/* + this.partida*/]);
      execute = false;
    }
  
    if (execute) {
      await this.useJoinGame(null, execute, false);
    }
  }
  
  async useJoinGame(gameId: string | null = null, execute: boolean, fromUrl: boolean = true) {
    if (execute) {
      console.log('gameId:', gameId);
      if (!gameId) gameId = window.prompt('Introduzca el ID de la partida (6 dígitos):');
      if (gameId) {
        const url = BACKEND_URL + '/getGame?idGame=' + gameId;
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          console.log('data:', data);
  
          if (data.exito === true) {
            if (fromUrl) {
              localStorage.setItem('partida_actual', JSON.stringify({ partida: gameId }));
            } else {
              if (data.tipo === 'l') {
                alert('No se puede unir a una partida local.');
              } else if (data.tipo === 'o') {
                localStorage.setItem('partida_actual', JSON.stringify({ partida: gameId }));
                this.router.navigate(['/game-page/' + gameId]);
              } else {
                alert('Error al obtener el tipo de partida.');
              }
            }
          } else {
            alert('No se ha podido unirse a la partida. Inténtalo de nuevo.');
            this.router.navigate(['/']);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        alert('ID de partida no válido.');
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToProfile(): void {
    this.router.navigate(['/profile-page']);
  }
  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('partida_actual');
    this.router.navigate(['/login-page']);
  }

  getColor(): string {
    if (this.completed === undefined) return 'red';
    if (this.completed < 20) return 'red';
    if (this.completed < 40) return 'orange';
    if (this.completed < 60) return 'yellow';
    if (this.completed < 80) return 'green';
    return 'blue';
  }
}

