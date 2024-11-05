import { Component, OnInit } from '@angular/core';
import { TurnoService } from '../../services/turno.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historia-turnos',
  templateUrl: './historia-turnos.component.html',
  styleUrls: ['./historia-turnos.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HistoriaTurnosComponent implements OnInit {
  turnosDespachados: any[] = [];

  constructor(private turnoService: TurnoService) {}

  ngOnInit() {
    this.turnoService.obtenerTurnosDespachados().subscribe({
      next: (data) => {
        this.turnosDespachados = data;
      },
      error: (error) => {
        console.error('Error al obtener los turnos despachados:', error);
      }
    });
  }
}
