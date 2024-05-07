import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  pausedGame: boolean = false;
  username: string = this.getUsername();
  requestedPause: boolean = false;
  started: boolean = false;
  numPlayers: number = 6;
  turno: number = 0;
  private idGame: string | null = null;
  cards: string[] = [];
  private sospechas: string[] = new Array(28).fill('');
  charactersSelected: boolean[] = [false, false, false, false, false, false];
  usernames: string[] = ["" , "", "", "", "", ""];

  userSelectedACharacter: boolean = false;
  userCharacter: number = -1;
  

  personajes: string[] = ["", "", "", "", "", ""];
  armas: string[] = ["", "", "", "", "", ""];
  lugares: string[] = ["", "", "", "", "", "", "", "", ""];
  abandonada: boolean= false;

  constructor() { }

  public setPersonajes(personajes: string[]): void {
    this.personajes = personajes;
    console.log("Personajes: ", this.personajes);
  }
  public setCharacterSelection(characterSelected: boolean): void {
    this.userSelectedACharacter = characterSelected;
  }
  public getCharacterSelection(): boolean {
    return this.userSelectedACharacter;
  }
  public setAbandonada(abandonada: boolean): void {
    this.abandonada = abandonada;
  }
  public getAbandonada(): boolean {
    return this.abandonada;
  }

  public setArmas(armas: string[]): void {
    this.armas = armas;
    console.log("Armas: ", this.armas);
  }

  setCards(newCards: string[]): void {
    this.cards = newCards;
  }
  public getidGame(): string | null {
    return this.idGame;
  }
  public setidGame(idGame: string): void {
    this.idGame = idGame;
  }
  

  getSospechas(): string[] {
    return this.sospechas;
  }
  setStarted(value: boolean): void {
    this.started = value;
  }
  getStarted(): boolean {
    return this.started;
  }

  setSospechas(sospechas: string[]): void {
    this.sospechas = sospechas;
  }

  public setLugares(lugares: string[]): void {
    this.lugares = lugares;
    console.log("Lugares: ", this.lugares);
  }
  setPausedGame(value: boolean): void {
    this.pausedGame = value;
  }

  setRequestedPause(value: boolean): void {
    this.requestedPause = value;
  }
public isRequestedPause(): boolean {
    return this.requestedPause;
  }

  public isPausedGame(): boolean {
    return this.pausedGame;
  } 
  public setUsuarios(usuarios: string[]): void {
    this.usernames = usuarios;
    console.log("Usuarios: ", this.usernames);
  }

  getTurno(): number {
    return this.turno;
  }

  siguienteTurno(): void {
    this.turno = (this.turno + 1) % this.numPlayers;
  }

  // Devuelve el nombre de usuario almacenado en el localStorage quitando el tipo null
  getUsernames(): string[] {
    return this.usernames;
  }
  getUsername(): string {
    const username = localStorage.getItem("username");
    return username ? username : "";
  }
  // Devuelve el nombre del personaje seleccionado por el usuario
  getPersonajeUsuario(): string {
    console.log("Personaje seleccionado: ", this.personajes[this.userCharacter]);
    return this.personajes[this.userCharacter];
  }

  getPersonaje(usuario: string): string {
    return this.personajes[this.usernames.indexOf(usuario)];
  }
}
