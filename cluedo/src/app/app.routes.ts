import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { GamePageComponent } from './game-page/game-page.component';

export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'game-page', component: GamePageComponent }
];