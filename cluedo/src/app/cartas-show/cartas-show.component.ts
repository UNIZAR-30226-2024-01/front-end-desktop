import { Component } from '@angular/core';
import { ShowCardsService } from '../servicios/servicio-show-cards/show-cards.service';
import { CommonModule } from '@angular/common';
import { CartasComponent } from '../cartas/cartas.component';
@Component({
  selector: 'app-cartas-show',
  standalone: true,
  imports: [CartasComponent, CommonModule],
  templateUrl: './cartas-show.component.html',
  styleUrl: './cartas-show.component.css'
})
export class CartasShowComponent {
  // hasToShow : boolean= false;
  constructor(public showCardsService: ShowCardsService) {
  //   this.showCardsService.hasToShow.subscribe(hasToShow => {
  //     this.hasToShow = hasToShow;
  //   });
   }
  // hasToShow = false;
  ngOnInit(): void {
  }

  onClickedCardLocal(carta: any): void {
    this.showCardsService.onClickedCard(carta);
    this.showCardsService.hasToShow = false;
  }

  getCardClass(carta: any): string {
    if (this.showCardsService.isCardElection && this.showCardsService.blockCards.includes(carta)) {
      return 'carta blocked';
    } else {
      return 'carta not-blocked';
    }
  }
}
