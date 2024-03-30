import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { InputMessageComponent } from './input-message.component';

import { GifsModule } from '../gifs/gifs.module';

@NgModule({
  declarations: [
    InputMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GifsModule
  ],
  providers: [],
})
export class AppModule { }