import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

export const routes: Routes = [
    { path: 'game-page', component: GamePageComponent },
    { path: 'login-page', component: LoginPageComponent},
    { path: 'register-page', component: RegisterPageComponent},
    { path: '', redirectTo: 'login-page', pathMatch: 'full'}
];