import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BusquedaComponent } from '../app/chat/gifs/busqueda/busqueda.component';
import { GifsService } from '../app/chat/gifs/services/gifs.service';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BusquedaComponent', () => {
  let component: BusquedaComponent;
  let fixture: ComponentFixture<BusquedaComponent>;
  let gifsService: GifsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule],
      declarations: [], 
      providers: [GifsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaComponent);
    component = fixture.componentInstance;
    gifsService = TestBed.inject(GifsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call buscar method', () => {
    spyOn(gifsService, 'buscarGifs');
    component.txtBuscar = { nativeElement: { value: 'hola' } } as any;
    component.buscar();
    expect(gifsService.buscarGifs).toHaveBeenCalledWith('hola');
    expect(component.txtBuscar.nativeElement.value).toBe('');
  });

  it('should not call buscarGifs if input is empty', () => {
    spyOn(gifsService, 'buscarGifs');
    component.txtBuscar = { nativeElement: { value: '' } } as any;
    component.buscar();
    expect(gifsService.buscarGifs).not.toHaveBeenCalled();
  });
});