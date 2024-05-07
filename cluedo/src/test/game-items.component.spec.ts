import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameItemsComponent } from '../app/game-items/game-items.component';
import { CommonModule } from '@angular/common';

describe('GameItemsComponent', () => {
  let component: GameItemsComponent;
  let fixture: ComponentFixture<GameItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      imports: [CommonModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign correct image source and alt text for player_name "SOPER"', () => {
    component.player_name = 'SOPER';
    component.ngOnInit();
    expect(component.imageSrc).toEqual('../../assets/images/personajes_imagen/svg/MrSoper.svg');
    expect(component.altText).toEqual('Imagen del logo del personaje Mr Soper');
  });

});