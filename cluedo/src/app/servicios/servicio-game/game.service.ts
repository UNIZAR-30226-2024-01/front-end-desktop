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


  personajes: string[] = ["", "", "", "", "", ""];
  armas: string[] = ["", "", "", "", "", ""];
  lugares: string[] = ["", "", "", "", "", "", "", "", ""];

  constructor() { }

  public setPersonajes(personajes: string[]): void {
    this.personajes = personajes;
    console.log("Personajes: ", this.personajes);
  }

  public setArmas(armas: string[]): void {
    this.armas = armas;
    console.log("Armas: ", this.armas);
  }

  public setLugares(lugares: string[]): void {
    this.lugares = lugares;
    console.log("Lugares: ", this.lugares);
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
  getUsername(): string {
    const username = localStorage.getItem("username");
    return username ? username : "";
  }

  // Devuelve el nombre del personaje seleccionado por el usuario
  getPersonajeUsuario(): string {
    return this.personajes[this.userCharacter];
  }

  getPersonaje(usuario: string): string {
    return this.personajes[this.usernames.indexOf(usuario)];
  }
}
