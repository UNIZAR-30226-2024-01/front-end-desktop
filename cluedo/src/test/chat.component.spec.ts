import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChatComponent } from '../app/chat/chat.component';
import { GameService } from '../app/servicios/servicio-game/game.service';
import { SocketService } from '../app/servicios/servicio-socket/socket.service';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  const mockGameService = {
    getPersonaje: jasmine.createSpy('getPersonaje')
  };

  const mockSocketService = {
    getMessageObservable: jasmine.createSpy('getMessageObservable').and.returnValue(of({})),
    chatMessage: jasmine.createSpy('chatMessage')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: SocketService, useValue: mockSocketService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle desplegado', () => {
    component.desplegado = false;
    component.toggleDesplegado();
    expect(component.desplegado).toBeTrue();
    component.toggleDesplegado();
    expect(component.desplegado).toBeFalse();
  });
});