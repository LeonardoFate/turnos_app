package proyecto.agendamedica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import proyecto.agendamedica.entity.Turno;

import java.util.List;
import java.util.Optional;

@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {
    // Método para obtener todos los turnos que no tienen comentario ni archivo
    @Query("SELECT t FROM Turno t WHERE t.comentario IS NULL AND t.archivoPath IS NULL")
    List<Turno> findTurnosSinComentarioYArchivo();


    // Método para obtener todos los turnos que ya han sido despachados
    @Query("SELECT t FROM Turno t WHERE t.comentario IS NOT NULL OR t.archivoPath IS NOT NULL")
    List<Turno> findTurnosDespachados();
}
