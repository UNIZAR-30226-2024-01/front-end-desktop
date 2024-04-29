import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-audio',
  standalone:true,
  template: `<audio #audioRef loop controls style="display: none;">
              <source src="../../assets/CluedoBanger.mp3" type="audio/mpeg">
            </audio>`
})
export class AudioComponent implements OnInit, OnDestroy {
  @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;

  constructor() { }

  ngOnInit(): void {
    const playAudio = () => {
      this.audioRef.nativeElement.play();
    };

    document.addEventListener('click', playAudio);
  }

  ngOnDestroy(): void {
    // document.removeEventListener('click', this.playAudio);
  }
}
