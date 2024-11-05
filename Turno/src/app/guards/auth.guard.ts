// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Permite el acceso si el usuario está autenticado
    } else {
      this.router.navigate(['/login']); // Redirige a login si no está autenticado
      return false;
    }
  }
}
