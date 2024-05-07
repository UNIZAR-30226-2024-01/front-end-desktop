import { TestBed } from '@angular/core/testing';
import { ShowCardsService } from '../app/servicios/servicio-cartas/cartas.service';
import { BehaviorSubject } from 'rxjs';

describe('ShowCardsService', () => {
  let service: ShowCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('showStatic should update text, subtext, selectCardsToShow, isCardElection, and hasToShow', () => {
    const text = 'test text';
    const subtext = 'test subtext';
    const cards = ['card1', 'card2'];
  
    service.showStatic(text, subtext, cards);
  
    (service['text'] as BehaviorSubject<string>).asObservable().subscribe(value => expect(value).toEqual(text));
    (service['subtext'] as BehaviorSubject<string>).asObservable().subscribe(value => expect(value).toEqual(subtext));
    (service['selectCardsToShow'] as BehaviorSubject<any[]>).asObservable().subscribe(value => expect(value).toEqual(cards));
    (service['isCardElection'] as BehaviorSubject<boolean>).asObservable().subscribe(value => expect(value).toEqual(false));
    (service['hasToShow'] as BehaviorSubject<boolean>).asObservable().subscribe(value => expect(value).toEqual(true));
  });
});