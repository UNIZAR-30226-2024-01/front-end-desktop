import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['../../../../../front-end-shared/css/Login/Login.css',
    '../../../../../front-end-shared/css/Login/CreateUser.css']

})
export class RegisterPageComponent {
  constructor(private router : Router) {}

  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  async handleRegister(): Promise<void> {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
    });

    const data = await response.json();
    if (data.success === true) {
      this.router.navigate(['/game-page']);
    } else {
      alert('Usuario ya registrado');
    }
  }


}
