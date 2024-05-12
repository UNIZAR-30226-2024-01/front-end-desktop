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
  hasToShow : boolean= false;
  isCardElection : boolean = false;
  blockedCards: any[] = [];
  selectCardsToShow: any[] = [];
  text: string = '';
  subtext: string = '';
  constructor(public showCardsService: ShowCardsService) {
    this.showCardsService.hasToShow.subscribe(hasToShow => {
      this.hasToShow = hasToShow;
    });
    this.showCardsService.isCardElection.subscribe(isCardElection => {
      this.isCardElection = isCardElection;
    });
    this.showCardsService.blockCards.subscribe(blockCards => {
      this.blockedCards = blockCards;
    });
    this.showCardsService.selectCardsToShow.subscribe(selectCardsToShow => {
      this.selectCardsToShow = selectCardsToShow;
    });
    this.showCardsService.text.subscribe(text => {
      this.text = text;
    }); 
    this.showCardsService.subtext.subscribe(subtext => {
      this.subtext = subtext;
    });
      
   }
  // hasToShow = false;
  ngOnInit(): void {
  }

  getSelectCards(): string {
    console.log("selectCardsToShow: ", this.selectCardsToShow);
    // return this.selectCardsToShow.join(', ');
    return this.selectCardsToShow[0]?.toString() || '';
  }

  getIsCardElection(): boolean {
    return this.isCardElection;
  }
  onClickedCardLocal(carta: any): void {
    //esto falta
    // this.showCardsService.onClickedCard(carta);
    // this.showCardsService.hasToShow = false;
    this.showCardsService.onClickedCard.next(carta);
    this.showCardsService.setHasToShow(false);
  }

  getCardClass(carta: any): string {
    if (this.isCardElection && this.blockedCards.includes(carta)) {
      return 'carta blocked';
    } else {
      return 'carta not-blocked';
    }
  }
}
