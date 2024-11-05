package proyecto.agendamedica.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TurnoUpdateDTO {

    private String comentario;
    private String archivoBase64;
}
