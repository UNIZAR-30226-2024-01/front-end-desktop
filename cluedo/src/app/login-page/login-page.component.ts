import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['../../../../../front-end-shared/css/Login/Login.css',
    '../../../../../front-end-shared/css/Login/CreateUser.css'],

  imports: [
    FormsModule, RouterLink]

})
export class LoginPageComponent {

  constructor(private router: Router) { }

  password: string = '';
  username: string = '';

  async handleLogin(): Promise<void>{
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password
      })
    });
    
    const data = await response.json();
    if (data.success === true) {
        this.router.navigate(['/game-page']);
    } else {
        alert('Usuario o contraseña incorrectos');
    }
  }

  ngOnDestroy() {
    // Limpiar los datos vinculados a ngModel al salir de la página
    this.username = '';
    this.password = '';
  }
}
