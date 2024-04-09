// home.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

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
  showGameModes: boolean = true;
  username: string = '';
isMenuOpen: any;
completed: number | undefined;
level: number | undefined;
width: string = "550px";
height: string = "70px";

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    if (!localStorage.getItem('username')) {
      this.username = 'Invitado';
    } else {
      this.username = localStorage.getItem('username') as string;
    }
    this.completed = this.completed === undefined ? 0 : this.completed;
    this.level = this.level === undefined ? 0 : this.level;
    this.obtainXP().then(xp => {
      const lvl = this.calculateLevel(xp);
      this.level = lvl;
      this.calculateXP(lvl, xp);
    });
  }
  async obtainXP(): Promise<number> {
    const username = localStorage.getItem('username');
    
    const url = `http://localhost:3000/obtainXP?username=${username}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.xp === undefined) {
      return 0;
    }
    return data.xp;
  }
  calculateLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp));
  }
  calculateXP(level: number, xp: number): void {
    const percentage = Math.trunc((Math.sqrt(xp) - level) * 100);
    this.completed = percentage;
  }
  newGameClick(): void {
    this.router.navigate(['/game-page']);
  }

  joinGameClick(): void {
    const gameId = prompt('Please enter the game ID:');
    if (gameId) {
      this.router.navigate(['/game-page', gameId]);
    }
  }

  toggleShowGameModes(): void {
    this.showGameModes = !this.showGameModes;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToProfile(): void {
    this.router.navigate(['/profile-page']);
  }
  logout(): void {
    localStorage.removeItem('username');
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

