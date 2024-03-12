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

// password: any;
// username: any;
//   constructor(private http: HttpClient) {}

//   login(username: string, password: string): void {
//     const url = 'http://localhost:3000/login'; // Ruta de tu endpoint de login en la API

//     // Objeto con los datos del usuario a enviar al servidor
//     const body = {
//       username: username,
//       password: password
//     };

//     // Realizar la petición POST al servidor
//     this.http.post(url, body).subscribe((response) => {
//       console.log('Respuesta del servidor:', response);
//       // Aquí puedes manejar la respuesta del servidor, por ejemplo, redirigir al usuario si el login fue exitoso
//     }, (error) => {
//       console.error('Error al realizar la petición:', error);
//       // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
//     });
//   }

  

}
