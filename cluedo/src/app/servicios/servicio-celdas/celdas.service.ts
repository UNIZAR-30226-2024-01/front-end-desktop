import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CeldasService {
  private celdasOptionsSubject = new BehaviorSubject<boolean[]>([]);
  celdasOptions$ = this.celdasOptionsSubject.asObservable();

  private playerPositionsSubject = new BehaviorSubject<number[]>([]);
  playerPositions$ = this.playerPositionsSubject.asObservable();

  constructor() { }

  setCeldasOptions(celdasOptions: boolean[]): void {
    this.celdasOptionsSubject.next(celdasOptions);
  }

  setPlayerPositions(playerPositions: number[]): void {
    this.playerPositionsSubject.next(playerPositions);
  }
}
