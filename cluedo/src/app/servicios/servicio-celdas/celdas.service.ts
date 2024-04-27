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

  constructor() {
    // Inicializar los BehaviorSubject con los valores predeterminados
    const celdasOptionsArray = Array(24 * 24).fill(false);
    this.celdasOptionsSubject.next(celdasOptionsArray);

    const playerPositionsArray = [120, 432, 561, 16, 191, 566];
    this.playerPositionsSubject.next(playerPositionsArray);
  }


  setCeldasOptions(celdasOptions: boolean[]): void {
    this.celdasOptionsSubject.next(celdasOptions);
  }

  setPlayerPositions(playerPositions: number[]): void {
    this.playerPositionsSubject.next(playerPositions);
  }
}
