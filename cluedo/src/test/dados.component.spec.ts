//4 test
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DadosComponent } from '../app/dados/dados.component';
import { CarruselComponent } from '../app/carrusel/carrusel.component';

describe('DadosComponent', () => {
  let component: DadosComponent;
  let fixture: ComponentFixture<DadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule ],
      declarations: []
    })
    .compileComponents();

    component = new DadosComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit finRoll event with total dice value when okButton is called', () => {
    spyOn(component.finRoll, 'emit');
    component.diceTotal = 7;
    component.okButton();
    expect(component.finRoll.emit).toHaveBeenCalledWith(7);
  });

  it('should set resultIsShown to false when okButton is called', () => {
    component.resultIsShown = true;
    component.okButton();
    expect(component.resultIsShown).toBe(false);
  });

  it('should set diceState1 and diceState2 to "end" when rollDice is called', () => {
    component.rollDice();
    expect(component.diceState1).toBe('end');
    expect(component.diceState2).toBe('end');
  });
  it('should initialize diceTotal to 0', () => {
    expect(component.diceTotal).toEqual(0);
  });
  
 /* it('should set resultIsShown to true when rollDice is called', () => {
    component.rollDice();
    expect(component.resultIsShown).toBeTrue();
  });
  
  it('should set diceTotal to a number between 2 and 12 when rollDice is called', (done) => {
    component.rollDice();
  
    // rollDice uses setTimeout, so we need to wait for it to finish
    setTimeout(() => {
      expect(component.diceTotal).toBeGreaterThanOrEqual(2);
      expect(component.diceTotal).toBeLessThanOrEqual(12);
      done(); // Indicate that the test is done
    }, 1100); // Wait for 1.1 seconds to ensure that the setTimeout in rollDice has finished
  });
  
  it('should emit finRoll event with total dice value when rollDice is called', () => {
    spyOn(component.finRoll, 'emit');
    component.rollDice();
    expect(component.finRoll.emit).toHaveBeenCalledWith(component.diceTotal);
  });*/
});