// src/app/app-routing.module.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RedirectAuthGuard } from './guards/RedirectAuthGuard-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/crear', pathMatch: 'full' },
  {
    path: 'crear',
    loadComponent: () => import('./turno/components/crear-turno/crear-turno.component').then(m => m.CrearTurnoComponent)
  },
  {
    path: 'cola',
    loadComponent: () => import('./turno/components/cola-turno/cola-turno.component').then(m => m.ColaTurnoComponent)
  },
  {
    path: 'ventanilla',
    loadComponent: () => import('./turno/components/ventanilla/ventanilla.component').then(m => m.VentanillaComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent),
    canActivate: [RedirectAuthGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'historial',
    loadComponent: () => import('./turno/components/historia-turnos/historia-turnos.component').then(m => m.HistoriaTurnosComponent),
    canActivate: [AuthGuard]  // Aplica AuthGuard para proteger la ruta de historial
  },
  { path: '**', redirectTo: '/crear' } // Ruta comodín para manejar rutas no encontradas
];
