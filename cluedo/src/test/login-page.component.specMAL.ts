import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginPageComponent } from '../app/login-page/login-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, CommonModule],
      declarations: [LoginPageComponent] // Declare the component here
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent); // Create a fixture
    component = fixture.componentInstance; // Get the instance from the fixture
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it('should navigate to home page if login is successful', async () => {
    spyOn(router, 'navigate');
    component.username = 'test';
    component.password = 'test';

    await component.handleLogin();

    const req = httpMock.expectOne('http://localhost:3000/login');
    expect(req.request.method).toBe('POST');

    req.flush({ exito: true, id_partida_actual: '123' });

    expect(localStorage.getItem('username')).toBe('test');
    expect(localStorage.getItem('partida_actual')).toBe('123');
    expect(router.navigate).toHaveBeenCalledWith(['/home-page']);
  });

  it('should show an alert if login fails', async () => {
    spyOn(window, 'alert');
    component.username = 'test';
    component.password = 'test';

    await component.handleLogin();

    const req = httpMock.expectOne('http://localhost:3000/login');
    expect(req.request.method).toBe('POST');

    req.flush({ exito: false });

    expect(window.alert).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
  });
});