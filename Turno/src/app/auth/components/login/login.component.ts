import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.loginForm = this.fb.group({
        correo: ['', [Validators.required, Validators.email]],
        contraseña: ['', Validators.required],
      });
    }

    onSubmit() {
      if (this.loginForm.valid) {
        const { correo, contraseña } = this.loginForm.value;

        this.authService.login(correo, contraseña).subscribe(
          response => {
            if (response.token) {
              // Espera un momento para asegurarte de que el token está en localStorage
              setTimeout(() => {
                this.router.navigate(['/historial']); // Navega después de asegurarte de que el token está guardado
              }, 100); // Ajusta el tiempo según sea necesario
            }
          },
          error => {
            console.error('Error de autenticación', error);
            alert('Correo o contraseña incorrectos');
          }
        );
      }
    }
  }
