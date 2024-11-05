export interface TurnoDTO {
    id: number;
    nombres: string;
    area: string;
    tramite: string;
    observacion?: string; // Propiedad opcional
    comentario?: string;  // Propiedad opcional
    archivoPath?: string; // Propiedad opcional para la ruta del archivo
    despachado?: boolean; // Para indicar si el turno ha sido despachado
  }
