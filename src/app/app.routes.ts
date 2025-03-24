import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  {path: 'messages', loadComponent: () => import('./messages/messages.component').then(m => m.MessagesComponent)},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '*', redirectTo: 'home', pathMatch: 'full'}
];
