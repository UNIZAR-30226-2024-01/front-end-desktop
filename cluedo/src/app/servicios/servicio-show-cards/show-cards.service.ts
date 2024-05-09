import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowCardsService {
  hasToShow: boolean = false;
  text: string = '';
  subtext: string = '';
  isCardElection: boolean = false;
  selectCardsToShow: any[] = ["SOPER","REDES", "FISICA"];
  blockCards: any[] = [];
  onClickedCard: any = () => {};

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

  showStatic(text: string, subtext: string, cards: any[]): void {
    this.text = text;
    this.subtext = subtext;
    this.selectCardsToShow = cards ? cards : [];
    this.isCardElection = false;
    this.hasToShow = true;
  }

  showQuestion(username_asking: string, cards: any[]): void {
    const text = `${this.getBotName(username_asking)} ha preguntado:`;
    const subText = `¿ha sido ${cards[0]} con ${cards[1]} en ${cards[2]}?`;

    this.showStatic(text, subText, cards);
  }

  showCardShowed(username_showed: string, username_shower: string, card: any[], cards_asked: any[]): void {
    this.selectCardsToShow = ['back'];
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
    
    this.text = text;
    this.subtext = subText;
    this.blockCards = blocked_cards;
    this.onClickedCard = onClickedCard;
    this.selectCardsToShow = my_cards;
    this.isCardElection = true;
    this.hasToShow = true;
  }

  restartShowCartas(): void {
    this.hasToShow = false;
    this.text = '';
    this.subtext = '';
    this.isCardElection = false;
    this.selectCardsToShow = [];
    this.blockCards = [];
    this.onClickedCard = () => {};
  }
}
