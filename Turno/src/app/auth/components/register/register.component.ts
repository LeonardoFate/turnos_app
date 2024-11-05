import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    registerForm: FormGroup;
    errorMessage: string | null = null; // Variable para almacenar el mensaje de error

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.registerForm = this.fb.group({
        nombre: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        contraseña: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    onSubmit() {
      if (this.registerForm.valid) {
        const { nombre, correo, contraseña } = this.registerForm.value;

        this.authService.register(nombre, correo, contraseña).subscribe(
          response => {
            this.errorMessage = null; // Limpiar el mensaje de error
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            this.router.navigate(['/login']);
          },
          error => {
            // Verifica si el error es específico de "El correo ya está registrado"
            if (error.status === 400 && error.error === "El correo ya está registrado") {
              this.errorMessage = "El correo ya está registrado. Por favor, usa otro.";
            } else {
              this.errorMessage = "Error en el registro. Intenta nuevamente.";
            }

            // Establecer un temporizador para ocultar el mensaje después de 3 segundos
            setTimeout(() => {
              this.errorMessage = null;
            }, 3000);
          }
        );
      }
    }
  }
