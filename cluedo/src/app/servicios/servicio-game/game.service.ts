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
  defaultBotNames: string[] = ["Intel", "WiFi", "Python", "Newton", "Grafo", "GPT"];

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

  public getPersonajes(): string[] {
    return this.personajes;
  }

  public getPersonajePorIndice(index: number): string {
    return this.personajes[index];
  }
  
  public setArmas(armas: string[]): void {
    this.armas = armas;
  }

  public getArmaPorIndice(index: number): string {
    return this.armas[index];
  }

  public getArmas(): string[] {
    return this.armas;
  }
  
  public setLugares(lugares: string[]): void {
    this.lugares = lugares;
  }

  public getLugares(): string[] {
    return this.lugares;
  }

  public getLugarPorIndice(index: number): string {
    return this.lugares[index];
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


  setCards(newCards: string[]): void {
    this.cards = newCards;    
  }
  // Devuelve las cartas del usuario
  getCards(): string[] {
    return this.cards;
  }

  // Devuelve la carta del usuario en la posición index
  getCard(index: number): string {
    // console.log("Carta (desde getCard): ", this.cards[index]);
    return this.cards[index];
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
