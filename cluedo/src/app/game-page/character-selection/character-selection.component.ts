import { Component } from '@angular/core';
import { GameService } from '../../servicios/servicio-game/game.service';

@Component({
  selector: 'app-character-selection',
  standalone: true,
  imports: [],
  templateUrl: './character-selection.component.html',
  styleUrl: '../../../../../../front-end-shared/css/Game/CharacterSelection.css'
})
export class CharacterSelectionComponent {
  constructor(public gameService: GameService) { 
  }

  isCharacterSelected(i: number): boolean {
    return this.gameService.charactersSelected[i];
  }

  selectCharacter(i: number) {
    this.gameService.charactersSelected[i] = true;
    this.gameService.usernames[i] = this.gameService.getUsername();
    this.gameService.userSelectedACharacter = true;
    this.gameService.userCharacter = i;
    console.log("Character selected: " + this.gameService.personajes[i]);
    console.log("Characters used: " + this.gameService.charactersSelected)

    console.log("Usernames: " + this.gameService.usernames);
  }

}
