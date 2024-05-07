 import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

 @Component({
   selector: 'app-temporizador',
   template: './temporizador.component.html',
   standalone: true,
   styleUrls: ['../../../../../front-end-shared/css/Game/Turno/Temporizador.css']
 })
 export class TemporizadorComponent implements OnInit, OnDestroy {
    @Input() tiempo: number = 45;
    @Output() temporizadorDone = new EventEmitter<void>();
    segundos: number | undefined;
    private intervalId: any;

    ngOnInit() {
      this.segundos = this.tiempo;
      this.intervalId = setInterval(() => {
        if (this.segundos && this.segundos > 0) {
          this.segundos--;
        } else {
          this.temporizadorDone.emit();
          this.clearTimer();
        }
      }, 1000);
    }

    ngOnDestroy() {
      this.clearTimer();
    }

    private clearTimer() {
      clearInterval(this.intervalId);
    }
 }