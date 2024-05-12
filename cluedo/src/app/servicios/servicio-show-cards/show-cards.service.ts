import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowCardsService {
  public hasToShow = new BehaviorSubject<boolean>(false);
  public text = new BehaviorSubject<string>('');
  public subtext = new BehaviorSubject<string>('');
  public isCardElection = new BehaviorSubject<boolean>(false);
  public selectCardsToShow = new BehaviorSubject<any[]>([]);
  public blockCards = new BehaviorSubject<any[]>([]);
  public onClickedCard = new BehaviorSubject<Function>(() => {});

  constructor() { }

  getBotName(username: string): string {
    if (username.includes('bot')) {
      // last digit of the bot name
      const index = parseInt(username[username.length - 1]);
      // return defaultBotNames[index];
      return username;
    } else {
      return username;
    }
  }

  showStatic(text: string, subtext: string, cards: any[]) {
      this.text.next(text);
      this.subtext.next(subtext);
      this.selectCardsToShow.next(cards || []);
      this.isCardElection.next(false);
      this.hasToShow.next(true);
      console.log("cards: ", cards);
    }

  showQuestion(username_asking: string, cards: any[]): void {
    const text = `${this.getBotName(username_asking)} ha preguntado:`;
    const subText = `¿ha sido ${cards[0]} con ${cards[1]} en ${cards[2]}?`;

    this.showStatic(text, subText, cards);
  }

  setHasToShow(hasToShow: boolean): void {
    this.hasToShow.next(hasToShow);
  }

  setIsCardElection(isCardElection: boolean): void {
    this.isCardElection.next(isCardElection);
  }

  showCardShowed(username_showed: string, username_shower: string, card: any[], cards_asked: any[]): void {
    // this.selectCardsToShow.next(['back']);
    const text = card[0] != '' ?
      `${this.getBotName(username_shower)} ha enseñado a ${this.getBotName(username_showed)}:` :
      `Nadie ha enseñado a ${this.getBotName(username_showed)}`;

    const subText = `¿ha sido ${cards_asked[0]} con ${cards_asked[1]} en ${cards_asked[2]}?`;
    this.showStatic(text, subText, card);
  }

  showCardElection(username_asking: string, my_cards: any[], cards_asked: any[], onClickedCard: any): void {
    const text = `Elige una carta para mostrar a ${this.getBotName(username_asking)}:`;
    const subText = `¿ha sido ${cards_asked[0]} con ${cards_asked[1]} en ${cards_asked[2]}?`;
    const blocked_cards = my_cards.filter((card) => !cards_asked.includes(card));
    
    this.text.next(text);
    this.subtext.next(subText);
    this.blockCards.next(blocked_cards);
    this.onClickedCard.next(onClickedCard);
    this.selectCardsToShow.next(my_cards);
    this.isCardElection.next(true);
    this.hasToShow.next(true);
  }

  restartShowCartas(): void {
    this.hasToShow.next(false);
    this.text.next('');
    this.subtext.next('');
    this.isCardElection.next(false);
    this.selectCardsToShow.next([]);
    this.blockCards.next([]);
    this.onClickedCard.next(() => {});
  }
}
