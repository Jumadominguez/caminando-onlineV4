import { Routes } from '@angular/router';
import { Home } from '../public/app/home/home';
import { Login } from '../public/app/login/login';
import { Register } from '../public/app/register/register';
import { PrivateLoginComponent } from '../private/app/login/login';
import { PrivateDashboardComponent } from '../private/app/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/public/home', pathMatch: 'full' },

  // Public routes
  { path: 'public/home', component: Home },
  { path: 'public/login', component: Login },
  { path: 'public/register', component: Register },

  // Private routes
  { path: 'private/login', component: PrivateLoginComponent },
  { path: 'private/dashboard', component: PrivateDashboardComponent },
];
