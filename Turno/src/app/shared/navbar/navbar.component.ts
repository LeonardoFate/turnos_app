import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    constructor(private authService: AuthService, private router: Router) {}

    activeLink: string = 'crear';


    isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
      }

    setActiveLink(link: string) {
      this.activeLink = link;
    }


  logout(): void {
    this.authService.logout().subscribe(
      (response: any) => {
        console.log(response); // Esto debería mostrar "Sesión cerrada exitosamente"
        localStorage.removeItem('token'); // Remueve el token en el frontend
        this.router.navigate(['/login']); // Redirige al login
      },
      (error: any) => {
        console.error('Error al cerrar sesión:', error);
      }
    );
}
navigateToLogin() {
    this.router.navigate(['/login']); // Navega a la página de inicio de sesión
  }

}
