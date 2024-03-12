import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: '../../../../../front-end-shared/css/Login/Login.css'
})
export class LoginPageComponent {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    this.http.post('http://localhost:3000/login', { username, password }).subscribe((res) => {
      console.log(res);
    });
  }
  

}
