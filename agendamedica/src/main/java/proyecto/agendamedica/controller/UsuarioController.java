package proyecto.agendamedica.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proyecto.agendamedica.dto.UsuarioRequest;
import proyecto.agendamedica.dto.UsuarioResponse;
import proyecto.agendamedica.service.UsuarioService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<UsuarioResponse> register(@RequestBody UsuarioRequest request) {
        UsuarioResponse response = usuarioService.register(request);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/login")
    public ResponseEntity<UsuarioResponse> login(@RequestBody UsuarioRequest request) {
        UsuarioResponse response = usuarioService.login(request);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(@RequestHeader("Authorization") String token) {
        // Puedes agregar lógica para invalidar el token aquí si es necesario
        Map<String, String> response = new HashMap<>();
        response.put("message", "Sesión cerrada exitosamente");
        return ResponseEntity.ok(response);
    }

}
