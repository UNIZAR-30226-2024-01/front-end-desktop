import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { NgModule } from '@angular/core';
@NgModule ({
  imports: [
    MatSlideToggleModule,MatToolbarModule,MatMenuModule
  ]
})
class AppModule {}