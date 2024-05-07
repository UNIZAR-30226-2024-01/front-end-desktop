import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChatComponent } from '../app/chat/chat.component';
import { GameService } from '../app/servicios/servicio-game/game.service';
import { SocketService } from '../app/servicios/servicio-socket/socket.service';
import { CommonModule } from '@angular/common';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  const mockGameService = {
    getPersonaje: jasmine.createSpy('getPersonaje').and.returnValue({ name: 'test' })
  };

  const mockSocketService = {
    getMessageObservable: jasmine.createSpy('getMessageObservable').and.returnValue(of({ msg: 'test', emisor: 'test', currentTimestamp: 'test' })),
    chatMessage: jasmine.createSpy('chatMessage')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: SocketService, useValue: mockSocketService }
      ],
      imports: [CommonModule],
      declarations: [] 

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
  
  it('should send message', () => {
    component.enviarMensaje('Hola');
    expect(mockSocketService.chatMessage).toHaveBeenCalledWith('Hola');
  });


  it('should toggle desplegado', () => {
    component.desplegado = false;
    component.toggleDesplegado();
    expect(component.desplegado).toBeTrue();
    component.toggleDesplegado();
    expect(component.desplegado).toBeFalse();
  });
});