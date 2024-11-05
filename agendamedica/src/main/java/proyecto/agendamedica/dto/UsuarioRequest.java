package proyecto.agendamedica.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UsuarioRequest {
    private String nombre;
    private String correo;
    private String contraseña;

}