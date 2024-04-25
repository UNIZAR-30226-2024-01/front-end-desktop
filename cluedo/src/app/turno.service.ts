import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private turnoOwnerSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private parteTurnoSubject: BehaviorSubject<string> = new BehaviorSubject<string>('espera-resto');
  private dadosSubject: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);

  turnoOwner$: Observable<string> = this.turnoOwnerSubject.asObservable();
  parteTurno$: Observable<string> = this.parteTurnoSubject.asObservable();
  dados$: Observable<number | undefined> = this.dadosSubject.asObservable();

  setTurnoOwner(turnoOwner: string): void {
    this.turnoOwnerSubject.next(turnoOwner);
  }

  setParteTurno(parteTurno: string): void {
    this.parteTurnoSubject.next(parteTurno);
  }

  setDados(dados: number | undefined): void {
    this.dadosSubject.next(dados);
  }
}
