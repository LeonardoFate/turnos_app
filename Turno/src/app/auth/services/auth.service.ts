import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8085/auth';
  private tokenKey = 'token'; // Clave para almacenar el token en localStorage

  constructor(private http: HttpClient, private router: Router) {}

  login(correo: string, contraseña: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { correo, contraseña }).pipe(
      tap((response) => {
        if (response.token) {
          console.log('Token guardado al iniciar sesión:', response.token); // Confirma que el token se guarda aquí
          localStorage.setItem(this.tokenKey, response.token);
        }
      })
    );
  }

  register(nombre: string, correo: string, contraseña: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { nombre, correo, contraseña });
  }

  logout(): Observable<string> {
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers, responseType: 'text' }).pipe(
      tap(() => {
        console.log('Cerrando sesión: eliminando token');
        localStorage.removeItem(this.tokenKey); // Elimina el token después de cerrar sesión
      })
    );
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Verifica si el token existe en localStorage
  }
}
