import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputMessageComponent } from '../app/chat/input-message/input-message.component';
import { CommonModule } from '@angular/common';

describe('InputMessageComponent', () => {
  let component: InputMessageComponent;
  let fixture: ComponentFixture<InputMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule],
      declarations: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit mensajeEnviado event when enviarMensaje is called', () => {
    spyOn(component.mensajeEnviado, 'emit');
    component.message = 'test message';
    component.enviarMensaje();
    expect(component.mensajeEnviado.emit).toHaveBeenCalledWith('test message');
  });

  it('should not emit mensajeEnviado event when message is empty', () => {
    spyOn(component.mensajeEnviado, 'emit');
    component.message = '';
    component.enviarMensaje();
    expect(component.mensajeEnviado.emit).not.toHaveBeenCalled();
  });

  it('should set showGifPicker when setShowGifPicker is called', () => {
    component.setShowGifPicker(true);
    expect(component.showGifPicker).toBe(true);
    component.setShowGifPicker(false);
    expect(component.showGifPicker).toBe(false);
  });
});