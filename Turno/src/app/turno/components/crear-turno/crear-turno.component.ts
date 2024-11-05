import { Component } from '@angular/core';
import { TurnoService } from '../../services/turno.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-turno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-turno.component.html',
  styleUrls: ['./crear-turno.component.scss'],
  providers: [TurnoService]
})
export class CrearTurnoComponent {
  turnoForm: FormGroup;
  submitted = false;
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' = 'success';
  areas: string[] = ['Sistemas', 'Financiero', 'RRHH'];
  tramites: string[] = ['Retiro de Equipos', 'Entrega de Equipos', 'Otros'];

  constructor(private fb: FormBuilder, private turnoService: TurnoService) {
    this.turnoForm = this.fb.group({
      nombres: ['', Validators.required],
      area: ['', Validators.required],
      tramite: ['', Validators.required],
      observacion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.turnoForm.valid) {
      // Si el formulario es válido, crear el turno
      this.turnoService.crearTurno(this.turnoForm.value).subscribe({
        next: () => {
          this.mostrarMensaje('Turno creado exitosamente', 'success');
          this.turnoForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          console.error('Error al crear el turno', err);
          this.mostrarMensaje('Error al crear el turno: ' + err.message, 'error');
          this.submitted = false;
        }
      });
    } else {
      // Si el formulario no es válido, mostrar un mensaje de advertencia
      this.mostrarMensaje('Por favor, complete todos los campos requeridos.', 'error');
      // Marcar todos los campos como "touched" para que se muestren los mensajes de error
      this.turnoForm.markAllAsTouched();
    }
  }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error'): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;

    setTimeout(() => {
      this.mensaje = ''; // Oculta el mensaje después de 3 segundos
    }, 3000);
  }
}
