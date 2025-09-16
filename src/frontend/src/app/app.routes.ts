import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rutas públicas
  {
    path: '',
    loadComponent: () => import('./public/home/components/home').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./public/login/components/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./public/register/components/register').then(m => m.RegisterComponent)
  },

  // Rutas privadas (requerirán autenticación)
  {
    path: 'dashboard',
    loadComponent: () => import('./private/dashboard/components/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./private/history/components/history').then(m => m.HistoryComponent)
  },
  {
    path: 'supermarket-links',
    loadComponent: () => import('./private/supermarket-links/supermarket-links').then(m => m.SupermarketLinksComponent)
  },

  // Rutas operativas
  {
    path: 'about',
    loadComponent: () => import('./ops/about/about').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./ops/contact/contact').then(m => m.ContactComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./ops/faq/faq').then(m => m.FaqComponent)
  },
  {
    path: 'tos',
    loadComponent: () => import('./ops/tos/tos').then(m => m.TosComponent)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./ops/privacy-policy/privacy-policy').then(m => m.PrivacyPolicyComponent)
  },

  // Ruta de error 404
  {
    path: '404',
    loadComponent: () => import('./ops/error404/error404').then(m => m.Error404Component)
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
