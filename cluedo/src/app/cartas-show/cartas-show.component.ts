import { Component } from '@angular/core';
import { ShowCardsService } from '../servicios/servicio-show-cards/show-cards.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CartasComponent } from '../cartas/cartas.component';
@Component({
  selector: 'app-cartas-show',
  standalone: true,
  imports: [CartasComponent, CommonModule, BrowserModule],
  templateUrl: './cartas-show.component.html',
  styleUrl: './cartas-show.component.css'
})
export class CartasShowComponent {
  constructor(public showCardsService: ShowCardsService) { }

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
