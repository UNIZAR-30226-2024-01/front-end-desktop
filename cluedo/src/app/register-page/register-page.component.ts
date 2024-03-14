import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [],
  templateUrl: './register-page.component.html',
  styleUrls: ['../../../../../front-end-shared/css/Tarjeta/Tarjeta.css',
  '../../../../../front-end-shared/css/Tarjeta/table-cell.css',
  '../../../../../front-end-shared/css/Tarjeta/table-head.css',
  '../../../../../front-end-shared/css/Tarjeta/table-header-cell.css',
  '../../../../../front-end-shared/css/Tarjeta/table-row.css']
})
export class RegisterPageComponent {
  constructor(private _route: ActivatedRoute) {}
}
