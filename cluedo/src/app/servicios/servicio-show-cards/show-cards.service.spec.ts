import { TestBed } from '@angular/core/testing';

import { ShowCardsService } from './show-cards.service';

describe('ShowCardsService', () => {
  let service: ShowCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
