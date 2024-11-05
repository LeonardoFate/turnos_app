package proyecto.agendamedica.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import proyecto.agendamedica.dto.TurnoDTO;
import proyecto.agendamedica.entity.Turno;
import proyecto.agendamedica.repository.TurnoRepository;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TurnoService {

    private final TurnoRepository turnoRepository;
    private final Path root = Paths.get("uploads");


    // Bloque de inicialización para crear el directorio de archivos
    {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("No se pudo crear el directorio de archivos", e);
        }
    }

    // Método para crear un turno
    @Transactional
    public TurnoDTO crearTurno(TurnoDTO turnoDTO) {
        Turno turno = Turno.builder()
                .nombres(turnoDTO.getNombres())
                .area(turnoDTO.getArea())
                .tramite(turnoDTO.getTramite())
                .observacion(turnoDTO.getObservacion())
                .build();

        turno = turnoRepository.save(turno);
        return toDTO(turno);
    }



    // Método para obtener solo los turnos sin comentario ni archivo (no despachados)
    @Transactional(readOnly = true)
    public List<TurnoDTO> obtenerTurnosSinDespachar() {
        return turnoRepository.findTurnosSinComentarioYArchivo().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Método para obtener el último turno sin despachar (para la pantalla de Ventanilla)
    @Transactional(readOnly = true)
    public TurnoDTO obtenerUltimoTurno() {
        return turnoRepository.findAll().stream()
                .filter(turno -> !turno.isDespachado()) // Filtra turnos despachados
                .map(this::toDTO)
                .findFirst()
                .orElse(null); // O manejarlo de otra forma si no hay turnos
    }


    // Método para agregar comentario y archivo y devolver el siguiente turno
    public TurnoDTO agregarComentarioYArchivo(Long id, String comentario, MultipartFile archivo) {
        Turno turno = turnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));

        // Agregar el comentario
        turno.setComentario(comentario);

        if (archivo != null && !archivo.isEmpty()) {
            try {
                // Guarda el archivo en el sistema de archivos
                Path destinationFile = root.resolve(Paths.get(archivo.getOriginalFilename())).normalize().toAbsolutePath();
                archivo.transferTo(destinationFile);
                turno.setArchivoPath(destinationFile.toString()); // Guarda la ruta del archivo
            } catch (IOException e) {
                throw new RuntimeException("Error al guardar el archivo", e);
            }
        }

        // Marcar el turno como despachado
        turno.setDespachado(true);

        // Guardar el turno actualizado
        turno = turnoRepository.save(turno);

        // Devolver el siguiente turno
        return obtenerUltimoTurno(); // O implementar un método que devuelva el siguiente turno
    }


    // Método auxiliar para convertir Turno a TurnoDTO
    private TurnoDTO toDTO(Turno turno) {
        return TurnoDTO.builder()
                .id(turno.getId()) // Incluye el id
                .nombres(turno.getNombres())
                .area(turno.getArea())
                .tramite(turno.getTramite())
                .observacion(turno.getObservacion())
                .build();
    }
    // Obtener todos los turnos despachados
    public List<Turno> obtenerTurnosDespachados() {
        return turnoRepository.findTurnosDespachados();
    }
}
