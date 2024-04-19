import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dados',
  standalone: true,
  animations: [
    trigger('rollDice', [
      state('start', style({
        transform: 'rotate(0deg)'
      })),
      state('end', style({
        transform: 'rotate(1800deg)'
      })),
      transition('start => end', animate('1s'))
    ])
  ],
  templateUrl: './dados.component.html',
  styleUrls: ['dados.component.css']
})
export class DadosComponent {
  diceState1: string = 'start';
  diceState2: string = 'start';
  buttonText: string = 'Roll Dice';
  diceImage1: string = 'assets/images/dado/dice1.png'; // Asegúrate de que esta ruta apunte a la imagen correcta
  diceImage2: string = 'assets/images/dado/dice1.png'; // Asegúrate de que esta ruta apunte a la imagen correcta
  // @Input() finRoll: any;
  @Output() finRoll: EventEmitter<number> = new EventEmitter<number>();

  rollDice(): void {
    this.diceState1 = 'end';
    this.diceState2 = 'end';
    setTimeout(() => {
      this.diceState1 = 'start';
      this.diceState2 = 'start';
      // Aquí es donde determinarías qué imagen de dados mostrar. Por ejemplo:
      const diceRoll1 = Math.floor(Math.random() * 6) + 1;
      const diceRoll2 = Math.floor(Math.random() * 6) + 1;
      this.diceImage1 = `assets/images/dado/dice${diceRoll1}.png`;
      this.diceImage2 = `assets/images/dado/dice${diceRoll2}.png`;
      const diceTotal = diceRoll1 + diceRoll2;
      console.log("Dados lanzados 1, valor: " + diceTotal);
      this.finRoll.emit(diceTotal);
    }, 1000); // Duración de la animación en milisegundos
  }
}