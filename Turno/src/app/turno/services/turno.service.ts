import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TurnoDTO } from '../../models/turno.dto'; // Asegúrate de tener esta importación
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private apiUrl = 'http://localhost:8085/api/turnos';
  public turnoSubject = new BehaviorSubject<TurnoDTO | null>(null); // Inicializa con null
  turno$ = this.turnoSubject.asObservable(); // Observable para suscribirse

  constructor(private http: HttpClient) {}

  // Método para crear un nuevo turno
  crearTurno(turno: TurnoDTO): Observable<TurnoDTO> {
    return this.http.post<TurnoDTO>(`${this.apiUrl}`, turno).pipe(
      tap((nuevoTurno: TurnoDTO) => {
        this.turnoSubject.next(nuevoTurno); // Emitir el nuevo turno
      })
    );
  }

  // Método para obtener la cola de turnos
  obtenerColaDeTurnos(): Observable<TurnoDTO[]> {
    return this.http.get<TurnoDTO[]>(`${this.apiUrl}/cola`);
  }

  // Método para obtener el último turno
  obtenerUltimoTurno(): Observable<TurnoDTO> { // Cambiar void a Observable<TurnoDTO>
    return this.http.get<TurnoDTO>(`${this.apiUrl}/ventanilla`).pipe(
      tap(turno => this.turnoSubject.next(turno)) // Emitir el nuevo turno
    );
  }

  // Método para agregar un comentario y un archivo
  agregarComentarioYArchivo(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/comentario-archivo`, data);
  }

  // Método para actualizar un turno con comentario y archivo
  actualizarTurno(id: number, comentario: string, archivo: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('comentario', comentario); // Nombre debe coincidir con el @RequestParam en el controlador
    if (archivo) {
      formData.append('archivo', archivo); // Añadir archivo solo si está presente
    }

    return this.http.put(`${this.apiUrl}/${id}/comentario-archivo`, formData);
  }

  obtenerTurnosDespachados(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/despachados`);
  }
}
