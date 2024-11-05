package proyecto.agendamedica.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proyecto.agendamedica.dto.TurnoDTO;
import proyecto.agendamedica.dto.TurnoUpdateDTO;
import proyecto.agendamedica.entity.Turno;
import proyecto.agendamedica.service.TurnoService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/turnos")
@RequiredArgsConstructor
public class TurnoController {

    private final TurnoService turnoService;

    // 1. Crear un nuevo turno
    @PostMapping
    public ResponseEntity<TurnoDTO> crearTurno(@RequestBody @Valid TurnoDTO turnoDTO) {
        TurnoDTO nuevoTurno = turnoService.crearTurno(turnoDTO);
        return new ResponseEntity<>(nuevoTurno, HttpStatus.CREATED);
    }

    // 2. Obtener la cola de turnos sin despachar
    @GetMapping("/cola")
    public ResponseEntity<List<TurnoDTO>> obtenerColaDeTurnos() {
        List<TurnoDTO> colaDeTurnos = turnoService.obtenerTurnosSinDespachar();
        return ResponseEntity.ok(colaDeTurnos);
    }

    // 3. Obtener el último turno en ventanilla (sin despachar)
    @GetMapping("/ventanilla")
    public ResponseEntity<TurnoDTO> obtenerUltimoTurnoEnVentanilla() {
        TurnoDTO ultimoTurno = turnoService.obtenerUltimoTurno();
        return ResponseEntity.ok(ultimoTurno);
    }

    @PutMapping("/{id}/comentario-archivo")
    public ResponseEntity<Map<String, Object>> agregarComentarioYArchivo(
            @PathVariable Long id,
            @RequestParam("comentario") String comentario,
            @RequestParam(value = "archivo", required = false) MultipartFile archivo) {

        TurnoDTO siguienteTurno = turnoService.agregarComentarioYArchivo(id, comentario, archivo);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Comentario y archivo agregados correctamente.");
        response.put("siguienteTurno", siguienteTurno); // Incluye el siguiente turno en la respuesta

        return ResponseEntity.ok(response);
    }
    // Endpoint para obtener todos los turnos despachados
    @GetMapping("/despachados")
    public List<Turno> obtenerTurnosDespachados() {
        return turnoService.obtenerTurnosDespachados();
    }

}
