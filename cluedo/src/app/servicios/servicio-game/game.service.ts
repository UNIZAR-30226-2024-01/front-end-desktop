import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  userSelectedACharacter: boolean = false;

  charactersSelected: boolean[] = [false, false, false, false, false, false];

  personajes: string[] = ["mr SOPER", "mr REDES", "mr PROG", "mr FISICA", "mr DISCRETO", "mr IA"];
  armas: string[] = ["teclado", "cable de red", "raton", "router", "troyano", "cd"];
  lugares: string[] = ["cafeteria", "baños", "recepcion", "escaleras", "biblioteca", "laboratorio", "despacho", "aulas norte", "aulas sur"];

  constructor() { }
}
