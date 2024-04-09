import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrls: ['../../../../../front-end-shared/css/Home/Settings.css'],
  imports: [
    FormsModule, RouterLink  ]
})
export class ProfilePageComponent {
  password = '';
  newPassword = '';

  constructor(private router: Router) {}
  volver(): void {
    this.router.navigate(['/home-page']);
  }

  async handlePasswordChange(): Promise<void> {
    const url = 'http://localhost:3000/changePassword';
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        oldPassword: this.password,
        newPassword: this.newPassword
      }),
    });

    const data = await response.json();
    if (data.success === true) {
      this.router.navigate(['/']); // Redirigir a la página principal después de cambiar la contraseña
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }}
 