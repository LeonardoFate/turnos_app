import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TurnoService } from '../../services/turno.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnoDTO } from '../../../models/turno.dto';

@Component({
  selector: 'app-ventanilla',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventanilla.component.html',
  styleUrls: ['./ventanilla.component.scss'],
  providers: [TurnoService]
})
export class VentanillaComponent implements OnInit {
  @ViewChild('archivoInput') archivoInput?: ElementRef; // Cambiar '!' a '?' para que sea opcional

  turnos: TurnoDTO[] = [];
  turnoActualIndex: number = 0;
  comentario: string = '';
  archivo: File | null = null;
  noHayTurnos: boolean = false;
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' = 'success';

  constructor(private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.cargarColaDeTurnos();
  }

  cargarColaDeTurnos(): void {
    this.turnoService.obtenerColaDeTurnos().subscribe(
      turnos => {
        this.turnos = turnos;
        if (this.turnos.length > 0) {
          this.turnoActualIndex = 0;
          this.actualizarTurnoActual();
          this.noHayTurnos = false;
        } else {
          this.noHayTurnos = true;
        }
      },
      error => {
        this.mostrarMensaje('Error al cargar la cola de turnos', 'error');
        this.noHayTurnos = true;
      }
    );
  }

  actualizarTurnoActual(): void {
    if (this.turnos.length > 0) {
      this.turnoService.turnoSubject.next(this.turnos[this.turnoActualIndex]);
    } else {
      this.turnoService.turnoSubject.next(null);
      this.noHayTurnos = true;
    }
  }

  saltarTurno(): void {
    if (this.turnos.length > 0) {
      this.turnoActualIndex = (this.turnoActualIndex + 1) % this.turnos.length;
      this.actualizarTurnoActual();
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.archivo = file;
  }

  onSubmit(): void {
    if (this.turnos.length > 0 && this.comentario) {
      const turnoActual = this.turnos[this.turnoActualIndex];
      const formData = new FormData();
      formData.append('comentario', this.comentario);
      if (this.archivo) {
        formData.append('archivo', this.archivo);
      }

      this.turnoService.actualizarTurno(turnoActual.id, this.comentario, this.archivo).subscribe({
        next: response => {
          this.mostrarMensaje('Se cargaron los datos correctamente', 'success');
          this.comentario = '';
          this.archivo = null;

          // Verificar si archivoInput está definido antes de usarlo
          if (this.archivoInput) {
            this.archivoInput.nativeElement.value = ''; // Limpia el campo de entrada de archivo en el DOM
          }
          this.cargarColaDeTurnos(); // Recargar la cola de turnos después de despachar
        },
        error: err => {
          this.mostrarMensaje('Error al agregar comentario y archivo: ' + err.message, 'error');
        }
      });
    } else {
      this.mostrarMensaje('Por favor, complete todos los campos necesarios (turno y comentario).', 'error');
    }
  }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error'): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;

    // Hace que el mensaje desaparezca después de 3 segundos
    setTimeout(() => {
      this.mensaje = ''; // Oculta el mensaje
    }, 3000);
  }

}
