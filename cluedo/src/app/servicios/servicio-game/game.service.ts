import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  username: string = this.getUsername();

  numPlayers: number = 6;
  turno: number = 0;

  charactersSelected: boolean[] = [false, false, false, false, false, false];
  usernames: string[] = ["" , "", "", "", "", ""];

  userSelectedACharacter: boolean = false;
  userCharacter: number = -1;


  personajes: string[] = ["mr SOPER", "mr REDES", "mr PROG", "mr FISICA", "mr DISCRETO", "mr IA"];
  armas: string[] = ["teclado", "cable de red", "raton", "router", "troyano", "cd"];
  lugares: string[] = ["cafeteria", "baños", "recepcion", "escaleras", "biblioteca", "laboratorio", "despacho", "aulas norte", "aulas sur"];

  constructor() { }

  getTurno(): number {
    return this.turno;
  }

  siguienteTurno(): void {
    this.turno = (this.turno + 1) % this.numPlayers;
  }

  // Devuelve el nombre de usuario almacenado en el localStorage quitando el tipo null
  getUsername(): string {
    const username = localStorage.getItem("username");
    return username ? username : "";
  }

  // Devuelve el nombre del personaje seleccionado por el usuario
  getPersonaje(): string {
    return this.personajes[this.userCharacter];
  }
}
