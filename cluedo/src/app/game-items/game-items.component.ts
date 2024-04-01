import { Component } from '@angular/core';

@Component({
  selector: 'app-game-items',
  standalone: true,
  template: `<img [src]="imageSrc" [alt]="altText" />`,  
})
export class GameItemsComponent {
  imageSrc: string = '';
  altText: string = '';

  constructor() {
    // Asigna la ruta de la imagen y el texto alternativo según el nombre del jugador
    const player_name = 'SOPER'; // Por ejemplo, asumiendo que tienes un nombre de jugador aquí
    switch (player_name.toUpperCase()) {
      case 'SOPER':
        this.imageSrc = "../../../../../front-end-shared/images/personajes_imagen/svg/MrSoper.svg";
        this.altText = 'Imagen del logo del personaje Mr Soper';
        break;
      case 'FISICA':
        this.imageSrc = '../../../../../../assets/images/personajes_imagen/svg/missFisica.svg';
        this.altText = 'Imagen del logo del personaje Miss Fisica';
        break;
      // Repite el mismo proceso para el resto de las imágenes
      default:
        this.imageSrc = '../../../../../../assets/images/logo-no-back.svg';
        this.altText = 'Imagen del logo la app';
        break;
    }
  }
}
