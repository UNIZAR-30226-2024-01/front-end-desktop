import { Component } from '@angular/core';

@Component({
  selector: 'app-game-items',
  standalone: true,
  templateUrl: './game-items.component.html',
  // template: `<img [src]="imageSrc" [alt]="altText" />`,  
})
export class GameItemsComponent {
  imageSrc: string = '';
  altText: string = '';

  constructor() {
    // Asigna la ruta de la imagen y el texto alternativo según el nombre del jugador
    const player_name = 'SOPER'; // Por ejemplo, asumiendo que tienes un nombre de jugador aquí
    switch (player_name.toUpperCase()) {
      case 'SOPER':
        this.imageSrc = '../../../../../front-end-shared/images/personajes_imagen/svg/MrSoper.svg';
        this.altText = 'Imagen del logo del personaje Mr Soper';
        break;
      case 'FISICA':
        this.imageSrc = '../../../../../front-end-shared/images/personajes_imagen/svg/missFisica.svg';
        this.altText = 'Imagen del logo del personaje Miss Fisica';
        break;  
      case 'IA':
        this.imageSrc = '../../../../../front-end-shared/images/personajes_imagen/svg/missIA.svg';
        this.altText = 'Imagen del logo del personaje Miss IA';
        break;
      case 'PROG':
        this.imageSrc = '../../../../../front-end-shared/images/personajes_imagen/svg/MrProg.svg';
        this.altText = 'Imagen del logo del personaje Mr Prog';
        break;
      case 'REDES':
        this.imageSrc = '../../../../../front-end-shared/images/personajes_imagen/svg/missRedes.svg';
        this.altText = 'Imagen del logo del personaje Miss Redes';
        break;
      case 'DISCRETO':
        this.imageSrc = '../../../../../front-end-shared/images/personajes_imagen/svg/mrDiscreto.svg';
        this.altText = 'Imagen del logo del personaje Mr Discreto';
        break;
      case 'CABLE':
        this.imageSrc = '../../../../../front-end-shared/images/objetos_imagen/svg/CABLE.svg';
        this.altText = 'Imagen del logo del objeto cable';
        break;
      case 'DISCO':
        this.imageSrc = '../../../../../front-end-shared/images/objetos_imagen/svg/DISCO.svg';
        this.altText = 'Imagen del logo del objeto disco';
        break;
      case 'ROUTER':
        this.imageSrc = '../../../../../front-end-shared/images/objetos_imagen/svg/ROUTER.svg';
        this.altText = 'Imagen del logo del objeto router';
        break;
      case 'SUSPENSO':
        this.imageSrc = '../../../../../front-end-shared/images/objetos_imagen/svg/SUSPENSO.svg';
        this.altText = 'Imagen del logo del objeto suspenso';
        break;
      case 'TAZA':
        this.imageSrc = '../../../../../front-end-shared/images/objetos_imagen/svg/TAZA.svg';
        this.altText = 'Imagen del logo del objeto taza';
        break;
      case 'TECLADO':
        this.imageSrc = '../../../../../front-end-shared/images/objetos_imagen/svg/TECLADO.svg';
        this.altText = 'Imagen del logo del objeto teclado';
        break;
      case 'TROYANO':
        this.imageSrc = '../../../../../front-end-shared/images/objetos_imagen/svg/TROYANO.svg';
        this.altText = 'Imagen del logo del objeto troyano';
        break;
      case 'CAFETERIA':
        this.imageSrc = '../../../../../front-end-shared/images/lugares_imagen/svg/CAFETERIA.svg';
        this.altText = 'Imagen del logo del lugar cafetería';
        break;
      case 'BAÑOS':
        this.imageSrc = '../../../../../front-end-shared/images/lugares_imagen/svg/BANIO.svg';
        this.altText = 'Imagen del logo del lugar baños';
        break;
      case 'RECEPCION':
        this.imageSrc = '../../../../../front-end-shared/images/lugares_imagen/svg/RECEPCION.svg';
        this.altText = 'Imagen del logo del lugar recepción';
        break;
      case 'ESCALERAS':
        this.imageSrc = '../../../../../front-end-shared/images/lugares_imagen/svg/ESCALERAS.svg';
        this.altText = 'Imagen del logo del lugar escaleras';
        break;
      case 'BIBLIOTECA':
        this.imageSrc = '../../../../../front-end-shared/images/lugares_imagen/svg/BIBLIOTECA.svg';
        this.altText = 'Imagen del logo del lugar biblioteca';
        break;
      case 'LABORATORIO':
        this.imageSrc = '../../../../../front-end-shared/images/lugares_imagen/svg/LABORATORIO.svg';
        this.altText = 'Imagen del logo del lugar laboratorio';
        break;
      case 'DESPACHO':
        this.imageSrc = '../../../../../front-end-shared/images/lugares_imagen/svg/DESPACHO.svg';
        this.altText = 'Imagen del logo del lugar despacho';
        break;
      case 'AULANORTE':
        this.imageSrc = '../../../../../front-end-shared/images/lugares_imagen/svg/AULANORTE.svg';
        this.altText = 'Imagen del logo del lugar aulanorte';
        break;
      case 'AULASUR':
        this.imageSrc = '../../../../../front-end-shared/images/lugares_imagen/svg/AULASUR.svg';
        this.altText = 'Imagen del logo del lugar aulasur';
        break;
      default:
        this.imageSrc = '../../../../../../assets/images/logo-no-back.svg';
        this.altText = 'Imagen del logo la app';
        break;
    }
  }
}
