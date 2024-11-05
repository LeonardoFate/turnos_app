package proyecto.agendamedica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import proyecto.agendamedica.dto.UsuarioRequest;
import proyecto.agendamedica.dto.UsuarioResponse;
import proyecto.agendamedica.entity.Usuario;
import proyecto.agendamedica.exception.AuthenticationException;
import proyecto.agendamedica.exception.EmailAlreadyExistsException;
import proyecto.agendamedica.repository.UsuarioRepository;
import proyecto.agendamedica.util.JwtUtil;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public UsuarioResponse register(UsuarioRequest request) {
        // Verificar si el correo ya está registrado
        if (usuarioRepository.findByCorreo(request.getCorreo()).isPresent()) {
            throw new EmailAlreadyExistsException("El correo ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setCorreo(request.getCorreo());
        usuario.setContraseña(passwordEncoder.encode(request.getContraseña()));
        usuario.setNombre(request.getNombre());
        usuarioRepository.save(usuario);

        String token = jwtUtil.generateAccessToken(usuario.getCorreo());

        return UsuarioResponse.builder()
                .nombre(usuario.getNombre())
                .correo(usuario.getCorreo())
                .token(token)
                .build();
    }


    public UsuarioResponse login(UsuarioRequest request) {
        Optional<Usuario> usuario = usuarioRepository.findByCorreo(request.getCorreo());
        if (usuario.isPresent() && passwordEncoder.matches(request.getContraseña(), usuario.get().getContraseña())) {
            String token = jwtUtil.generateAccessToken(usuario.get().getCorreo());
            return UsuarioResponse.builder()
                    .nombre(usuario.get().getNombre())
                    .correo(usuario.get().getCorreo())
                    .token(token)
                    .build();
        }
        // Lanza una excepción de autenticación si las credenciales no coinciden
        throw new AuthenticationException("Usuario o contraseña incorrectos");
    }

}
