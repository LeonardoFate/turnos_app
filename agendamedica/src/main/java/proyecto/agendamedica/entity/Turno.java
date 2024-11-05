package proyecto.agendamedica.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "turnos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombres;


    @Column(nullable = false)
    private String area;


    @Column(nullable = false)
    private String tramite;

    private String observacion;
    private String comentario; // Campo para el comentario
    private String archivoPath; // Campo para la ruta del archivo
    private boolean despachado = false;
}
