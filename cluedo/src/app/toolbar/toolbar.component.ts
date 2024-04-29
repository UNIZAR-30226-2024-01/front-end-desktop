import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatMenuModule,CommonModule,RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: '../../../../../front-end-shared/css/Game/NavbarGame.css'
})
export class ToolbarComponent {
constructor(private router: Router/*, private http: HttpClient*/)  {
  // Inicializar el usuario aquí si es necesario
  // this.user=
}
abandonarPartida() {
  
  this.router.navigate(['/home-page']);
}
  isOpen: boolean = false;
  user: string | undefined;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
