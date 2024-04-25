import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { ChatComponent } from './chat/chat.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TurnoService } from './turno.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ChatComponent,
    TarjetaComponent, ToolbarComponent,MatToolbarModule],
  providers: [TurnoService],
  templateUrl: './app.component.html',
  styleUrl: '../../../../front-end-shared/css/App.css'
})

export class AppComponent {
  title = 'cluedo';
}
