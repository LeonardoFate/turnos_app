package proyecto.agendamedica.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TurnoDTO {
    private Long id;
    @NotBlank
    private String nombres;

    @NotBlank
    private String area;

    @NotBlank
    private String tramite;

    private String observacion;

}
