import { Component, Input, viewChild } from '@angular/core';
import { CartasComponent } from '../cartas/cartas.component';
import { CarouselModule } from 'primeng/carousel';
import { GameService } from '../servicios/servicio-game/game.service';


@Component({
  selector: 'app-carrusel',
  standalone: true,
  templateUrl: './carrusel.component.html',
  imports:[CartasComponent, CarouselModule],
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {
  @Input() options: string[] |undefined;
  @Input() type: string | undefined;

  products: any[];

    responsiveOptions: any[] | undefined;
    constructor(public gameService: GameService){
      this.products = this.gameService.armas.concat(this.gameService.lugares, this.gameService.personajes)
    }

    ngOnInit() {
      // this.products = this.gameService.armas.concat(this.gameService.lugares, this.gameService.personajes)
      this.products=  ["SOPER","FISICA"]
     this.responsiveOptions = [
          {
              breakpoint: '1199px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '991px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '767px',
              numVisible: 1,
              numScroll: 1
          }
      ];
  }  

  settings = {
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    initialSlide: 0,
  };

  onChange(option: string) {
    // Aquí puedes manejar el cambio de opción
  }
}
