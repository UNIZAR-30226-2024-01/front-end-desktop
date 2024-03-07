import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatMenuModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

}
