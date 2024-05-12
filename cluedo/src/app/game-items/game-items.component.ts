import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-game-items',
  standalone: true,
  templateUrl: './game-items.component.html',
  styleUrl: './game-items.component.css',
  // templateUrl: '../../assets/images/personajes_imagen/svg/MrSoper.svg',
  // template: `<img [src]="imageSrc" [alt]="altText" />`,  
})
export class GameItemsComponent {
  imageSrc: string = this.getSrc();
  altText: string = this.getAltText();
  @Input() player_name: string = '';
  
  constructor() {}

  ngOnInit(): void {
    console.log("Nombre del jugador: ", this.player_name);
    
  }

  getSrc(): string {
    switch (this.player_name) {
      case 'mr SOPER':
        return this.imageSrc = '../../assets/images/personajes_imagen/svg/MrSoper.svg';
      case 'miss FISICA':
        return this.imageSrc = '../../assets/images/personajes_imagen/svg/missFisica.svg';
      case 'miss IA':
        return this.imageSrc = '../../assets/images/personajes_imagen/svg/missIA.svg';
      case 'mr PROG':
        return this.imageSrc = '../../assets/images/personajes_imagen/svg/MrProg.svg';
      case 'miss REDES':
        return this.imageSrc = '../../assets/images/personajes_imagen/svg/missRedes.svg';
      case 'mr DISCRETO':
        return this.imageSrc = '../../assets/images/personajes_imagen/svg/mrDiscreto.svg';
      case 'cable de red':
        return this.imageSrc = '../../assets/images/objetos_imagen/svg/CABLE.svg';
      case 'cd':
        return this.imageSrc = '../../assets/images/objetos_imagen/svg/DISCO.svg';
      case 'router afilado':
        return this.imageSrc = '../../assets/images/objetos_imagen/svg/ROUTER.svg';
      case 'SUSPENSO':
        return this.imageSrc = '../../assets/images/objetos_imagen/svg/SUSPENSO.svg';
      case 'cafe envenenado':
        return this.imageSrc = '../../assets/images/objetos_imagen/svg/TAZA.svg';
      case 'teclado':
        return this.imageSrc = '../../assets/images/objetos_imagen/svg/TECLADO.svg';
      case 'troyano':
        return this.imageSrc = '../../assets/images/objetos_imagen/svg/TROYANO.svg';
      case 'cafeteria':
        return this.imageSrc = '../../assets/images/lugares_imagen/svg/CAFETERIA.svg';
      case 'baños':
        return this.imageSrc = '../../assets/images/lugares_imagen/svg/BANIO.svg';
      case 'recepcion':
        return this.imageSrc = '../../assets/images/lugares_imagen/svg/RECEPCION.svg';
      case 'escaleras':
        return this.imageSrc = '../../assets/images/lugares_imagen/svg/ESCALERAS.svg';
      case 'biblioteca':
        return this.imageSrc = '../../assets/images/lugares_imagen/svg/BIBLIOTECA.svg';
      case 'laboratorio':
        return this.imageSrc = '../../assets/images/lugares_imagen/svg/LABORATORIO.svg';
      case 'despacho':
        return this.imageSrc = '../../assets/images/lugares_imagen/svg/DESPACHO.svg';
      case 'aulas norte':
        return this.imageSrc = '../../assets/images/lugares_imagen/svg/AULANORTE.svg';
      case 'aulas sur':
        return this.imageSrc = '../../assets/images/lugares_imagen/svg/AULASUR.svg';
      default:
        return this.imageSrc = '../../assets/images/logo-no-back.svg';
    }
  }

  getAltText(): string {
    switch (this.player_name) {
      case 'mr SOPER':
        return this.altText = 'Imagen del logo del personaje Mr Soper';
      case 'miss FISICA':
        return this.altText = 'Imagen del logo del personaje Miss Fisica';
      case 'miss IA':
        return this.altText = 'Imagen del logo del personaje Miss IA';
      case 'mr PROG':
        return this.altText = 'Imagen del logo del personaje Mr Prog';
      case 'miss REDES':
        return this.altText = 'Imagen del logo del personaje Miss Redes';
      case 'mr DISCRETO':
        return this.altText = 'Imagen del logo del personaje Mr Discreto';
      case 'cable de red':
        return this.altText = 'Imagen del logo del objeto cable';
      case 'cd':
        return this.altText = 'Imagen del logo del objeto disco';
      case 'router afilado':
        return this.altText = 'Imagen del logo del objeto router';
      case 'SUSPENSO':
        return this.altText = 'Imagen del logo del objeto suspenso';
      case 'cafe envenenado':
        return this.altText = 'Imagen del logo del objeto taza';
      case 'teclado':
        return this.altText = 'Imagen del logo del objeto teclado';
      case 'troyano':
        return this.altText = 'Imagen del logo del objeto troyano';
      case 'cafeteria':
        return this.altText = 'Imagen del logo del lugar cafetería';
      case 'baños':
        return this.altText = 'Imagen del logo del lugar baños';
      case 'recepcion':
        return this.altText = 'Imagen del logo del lugar recepción';
      case 'escaleras':
        return this.altText = 'Imagen del logo del lugar escaleras';
      case 'biblioteca':
        return this.altText = 'Imagen del logo del lugar biblioteca';
      case 'laboratorio':
        return this.altText = 'Imagen del logo del lugar laboratorio';
      case 'despacho':
        return this.altText = 'Imagen del logo del lugar despacho';
      case 'aulas norte':
        return this.altText = 'Imagen del logo del lugar aulanorte';
      case 'aulas sur':
        return this.altText = 'Imagen del logo del lugar aulasur';
      default:
        return this.altText = 'Imagen del logo la app';
    }
  }


}
