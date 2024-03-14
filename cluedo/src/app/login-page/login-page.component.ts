import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
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

  password: string = '';
  username: string = '';

  login(): void {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }

  // constructor(private http: HttpClient, private _route: ActivatedRoute) {}

  // login(): void {
  //   const url = 'http://localhost:4200/login'; // Ruta de tu endpoint de login en la API

  //   // Objeto con los datos del usuario a enviar al servidor
  //   // const body = {
  //   //   username: username,
  //   //   password: password
  //   // };

  //   // Realizar la petición POST al servidor
  //   this.http.post(url, this.username, this.password).subscribe((response) => {
  //     console.log('Respuesta del servidor:', response);
  //     // Aquí puedes manejar la respuesta del servidor, por ejemplo, redirigir al usuario si el login fue exitoso
  //   }, (error) => {
  //     console.error('Error al realizar la petición:', error);
  //     // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
  //   });

  //}

  // login() {
  //   // Llama al método de autenticación del servicio AuthService
  //   this.http.post(this.username, this.password)
  //     .subscribe((result) => {
  //       // Maneja la respuesta de la consulta a la base de datos
  //       console.log('Respuesta de la base de datos:', result);
  //     }, (error) => {
  //       // Maneja cualquier error que ocurra durante la consulta a la base de datos
  //       console.error('Error al consultar la base de datos:', error);
  //     });
  // }

}
