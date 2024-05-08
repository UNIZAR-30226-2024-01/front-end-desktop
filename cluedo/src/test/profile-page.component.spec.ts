import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePageComponent } from '../app/profile-page/profile-page.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page when volver is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.volver();

    expect(navigateSpy).toHaveBeenCalledWith(['/home-page']);
  });

});