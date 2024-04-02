import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatMenuModule,CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: '../../../../../front-end-shared/css/Game/NavbarGame.css'
})
export class ToolbarComponent {
  isOpen: boolean = false;
  user: string | undefined;

  constructor() {
    // Inicializar el usuario aquí si es necesario
    // this.user=
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
