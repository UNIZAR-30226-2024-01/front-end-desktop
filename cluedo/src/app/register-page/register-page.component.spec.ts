import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageComponent } from './register-page.component';
import { ActivatedRoute, Routes } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterPageComponent
  },
  { path: 'login',
    component: LoginPageComponent
  },
];

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function ngOnInit() {
  throw new Error('Function not implemented.');
}

