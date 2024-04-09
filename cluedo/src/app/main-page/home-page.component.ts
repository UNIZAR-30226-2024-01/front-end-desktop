// home.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  standalone: true,
  styleUrls: ['../../../../../front-end-shared/css/Login/Login.css',
  '../../../../../front-end-shared/css/Home/Home.css', '../../../../../front-end-shared/css/Home/NavbarHome.css'],
  imports: [
    CommonModule, RouterLink]
})

export class HomeComponent implements OnInit {
  showGameModes: boolean = true;
  username: string = '';
isMenuOpen: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('username')) {
      this.username = 'Invitado';
    } else {
      this.username = localStorage.getItem('username') as string;
    }
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

}
