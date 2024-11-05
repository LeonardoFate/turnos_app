// src/app/guards/redirect-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/crear']); // Redirige a 'Crear Turno' si el usuario está autenticado
      return false;
    }
    return true; // Permite el acceso si el usuario no está autenticado
  }
}
