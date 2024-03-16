import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register-page.component.html',
  styleUrls: ['../../../../../front-end-shared/css/Login/Login.css',
    '../../../../../front-end-shared/css/Login/CreateUser.css']

})
export class RegisterPageComponent {
  constructor(private _route: ActivatedRoute) {}
}
