import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register-page.component.html',
  styleUrls: ['../../../../../front-end-shared/css/Login/Login.css',
    '../../../../../front-end-shared/css/Login/CreateUser.css']

})
export class RegisterPageComponent {
  constructor(private router : Router) {}

  // username: string = '';
  // password: string = '';
  // confirmPassword: string = '';

  async handleRegister(username : string, password : string, confirmPassword : string): Promise<void> {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const response = await fetch( BACKEND_URL+ '/createAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    if (data.success === true) {
      localStorage.setItem('username', username); 
      this.router.navigate(['/home-page']);
    } else {
      alert('Usuario ya registrado');
    } 
  }
}
