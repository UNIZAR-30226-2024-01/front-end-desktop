import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { TurnoComponent } from './turno/turno.component';
import { TurnoService } from './servicios/servicio-turno/turno.service';
@NgModule ({
  imports: [
    MatSlideToggleModule,MatToolbarModule,MatMenuModule
  ],
  declarations: [
    // Otros componentes declarados aquí
    TurnoComponent
  ],
  providers: [
    TurnoService
    // Otros proveedores aquí si los hay

  ]
})
class AppModule {}