import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
    })
export class TurnoService {
    private turnoOwnerSubject = new BehaviorSubject<string>('');
    turnoOwner$ = this.turnoOwnerSubject.asObservable();
    private turnoOwner: string = '';
    private parteTurnoSubject = new BehaviorSubject<string>('espera-resto');
    parteTurno$ = this.parteTurnoSubject.asObservable();
    private parteTurno: string = 'espera-resto';
    private dadosSubject = new BehaviorSubject<number>(0);
    dados$ = this.dadosSubject.asObservable();
    private dados: number = 0;
    private habitacion$= new BehaviorSubject<string>('');
    private habitacion: string = '';

    constructor() {
        this.parteTurno$.subscribe(parteTurno => {
            this.parteTurno = parteTurno;
        });
        this.dados$.subscribe(dados => {
            this.dados = dados;
        });
        this.turnoOwner$.subscribe(turnoOwner => {
            this.turnoOwner = turnoOwner;
        });
        this.habitacion$.subscribe(habitacion => {
            this.habitacion = habitacion;
        });
    }

    

    restartTurno = (): void => {
        this.setTurnoOwner('');
        this.setParteTurno('espera-resto');
        this.setDados(0);
      }
    getTurnoOwner(): string {
        return this.turnoOwner;
    }
    getParteTurno(): string {
        return this.parteTurno;
    }

    getDados(): number {
        return this.dados;
    }


    setTurnoOwner(turnoOwner: string): void {
        console.log("Setenado el Turno owner: ", turnoOwner);
        this.turnoOwner = turnoOwner;
        this.turnoOwnerSubject.next(turnoOwner);
    }
    
    setParteTurno(parteTurno: string): void {
        console.log("Setenado la parte del turno: ", parteTurno);
        this.parteTurno = parteTurno;
        this.parteTurnoSubject.next(parteTurno);
    }

    setDados(dados: number): void {
        console.log("Setenado los dados: ", dados);
        this.dados = dados;
        this.dadosSubject.next(dados);
    }
}
  