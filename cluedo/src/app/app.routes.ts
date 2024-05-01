import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomeComponent } from './main-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
export const routes: Routes = [
    { path: 'game-page/:idGame', component: GamePageComponent },
    { path: 'login-page', component: LoginPageComponent},
    { path: 'register-page', component: RegisterPageComponent},
    { path: 'home-page', component: HomeComponent},
    { path: 'profile-page', component: ProfilePageComponent},
    { path: '', redirectTo: 'login-page', pathMatch: 'full'}
];