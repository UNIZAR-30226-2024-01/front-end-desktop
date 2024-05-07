import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TextComponent } from '../app/game-page/tablero/text/text.component';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [] 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    component.estilo = { left: '0px', top: '0px' }; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});