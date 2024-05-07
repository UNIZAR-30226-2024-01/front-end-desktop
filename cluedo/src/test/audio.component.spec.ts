import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ElementRef, ViewChild } from '@angular/core';

// Mock AudioComponent
@Component({
  selector: 'app-audio',
  template: `<audio #audioRef></audio>`
})
class MockAudioComponent {
  @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;

  playAudio(): void {
    this.audioRef.nativeElement.play();
  }
}

describe('MockAudioComponent', () => {
  let component: MockAudioComponent;
  let fixture: ComponentFixture<MockAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockAudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should play audio when playAudio is called', () => {
    const audioElement = fixture.debugElement.query(By.css('audio')).nativeElement;
    spyOn(audioElement, 'play');

    component.playAudio();

    expect(audioElement.play).toHaveBeenCalled();
  });
});