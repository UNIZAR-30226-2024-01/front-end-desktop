import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowCardsService {
  public hasToShow = new BehaviorSubject<boolean>(false);
  private text = new BehaviorSubject<string>('');
  private subtext = new BehaviorSubject<string>('');
  private isCardElection = new BehaviorSubject<boolean>(false);
  private selectCardsToShow = new BehaviorSubject<any[]>([]);
  private blockCards = new BehaviorSubject<any[]>([]);
  private onClickedCard = new BehaviorSubject<Function>(() => {});

  showStatic(text: string, subtext: string, cards: any[]) {
    this.text.next(text);
    this.subtext.next(subtext);
    this.selectCardsToShow.next(cards || []);
    this.isCardElection.next(false);
    this.hasToShow.next(true);
  }

  showQuestion(username_asking: string, cards: any[]) {
    const text = `${username_asking.toUpperCase()} ha preguntado:`;
    const subText = `¿ha sido ${cards[0]} con ${cards[1]} en ${cards[2]}?`;
    this.showStatic(text, subText, cards);
  }

  showCardShowed(username_showed: string, username_shower: string, card: any, cards_asked: any[]) {
    this.selectCardsToShow.next(['back']);
    const text = card[0] != '' ? `${username_shower} ha enseñado a ${username_showed}:` : `Nadie ha enseñado a ${username_showed}`;
    const subText = `¿ha sido ${cards_asked[0]} con ${cards_asked[1]} en ${cards_asked[2]}?`;
    this.showStatic(text, subText, card);
  }

  showCardElection(username_asking: string, my_cards: any[], cards_asked: any[], onClickedCard: Function) {
    const text = `Elige una carta para mostrar a ${username_asking}:`;
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

  restartShowCartas() {
    this.hasToShow.next(false);
    this.text.next('');
    this.subtext.next('');
    this.isCardElection.next(false);
    this.selectCardsToShow.next([]);
    this.blockCards.next([]);
    this.onClickedCard.next(() => {});
  }
}