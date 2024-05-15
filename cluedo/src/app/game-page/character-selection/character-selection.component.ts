import { Component } from '@angular/core';
import { GameService } from '../../servicios/servicio-game/game.service';
import { SocketService } from '../../servicios/servicio-socket/socket.service';

@Component({
  selector: 'app-character-selection',
  standalone: true,
  imports: [],
  templateUrl: './character-selection.component.html',
  styleUrl: '../../../../../../front-end-shared/css/Game/CharacterSelection.css'
})
export class CharacterSelectionComponent {
  constructor(public gameService: GameService, public socketService:SocketService) { 
  }

  isCharacterSelected(i: number): boolean {
    return this.gameService.usernames[i] != "";
  }

  selectCharacter(i: number) {
    this.gameService.charactersSelected[i] = true;
    this.gameService.usernames[i] = localStorage.getItem('username') ?? '';
    this.gameService.userSelectedACharacter = true;
    this.gameService.userCharacter = i;
    console.log("Character selected: " + this.gameService.personajes[i]);
    console.log("Characters used: " + this.gameService.charactersSelected)

    console.log("Usernames: " + this.gameService.usernames);
    this.socketService.selectCharacter( this.gameService.personajes[i]);
  }

}
