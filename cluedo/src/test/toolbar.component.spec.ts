import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToolbarComponent } from '../app/toolbar/toolbar.component';
import { SocketService } from '../app/servicios/servicio-socket/socket.service';
import { GameService } from '../app/servicios/servicio-game/game.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  const mockSocketService = {
    continuar_partida: jasmine.createSpy('continuar_partida'),
    pausar_partida: jasmine.createSpy('pausar_partida'),
    abandonar: jasmine.createSpy('abandonar')
  };

  const mockGameService = {
    pausedGame: false,
    requestedPause: false,
    setPausedGame: jasmine.createSpy('setPausedGame'),
    setRequestedPause: jasmine.createSpy('setRequestedPause')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatToolbarModule, MatIconModule, MatMenuModule, CommonModule],
      declarations: [ ],
      providers: [
        { provide: SocketService, useValue: mockSocketService },
        { provide: GameService, useValue: mockGameService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});