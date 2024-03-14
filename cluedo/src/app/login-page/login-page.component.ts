import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module'; // Importa el AppRoutingModule

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: '../../../../../front-end-shared/css/Login/Login.css',

  imports: [
    FormsModule // Agrega FormsModule a la lista de imports
  ]

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
        this.router.navigate(['/game-user']);
    } else {
        alert('Usuario o contraseña incorrectos');
    }
  }
}
