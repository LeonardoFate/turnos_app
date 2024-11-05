import { Component, OnInit } from '@angular/core';
import { TurnoService } from '../../services/turno.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cola-turno',
  standalone: true,
  imports: [CommonModule, FormsModule], // Elimina MatTableModule
  templateUrl: './cola-turno.component.html',
  styleUrls: ['./cola-turno.component.scss'],
  providers: [TurnoService]
})
export class ColaTurnoComponent implements OnInit {
  turnos: any[] = [];
  displayedColumns: string[] = ['numero', 'nombre', 'area'];

  constructor(private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.turnoService.obtenerColaDeTurnos().subscribe(response => {
      this.turnos = response;
    });
  }
}
