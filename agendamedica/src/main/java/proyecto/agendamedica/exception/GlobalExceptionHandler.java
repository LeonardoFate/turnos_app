package proyecto.agendamedica.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Manejo específico para errores de autenticación
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public String handleAuthenticationException(AuthenticationException ex) {
        return "Usuario o contraseña incorrectos";
    }

    // Manejo de EmailAlreadyExistsException con BAD_REQUEST
    @ExceptionHandler(EmailAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public String handleEmailAlreadyExistsException(EmailAlreadyExistsException ex) {
        return ex.getMessage(); // Devuelve "El correo ya está registrado"
    }

    // Manejo general para RuntimeException
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public String handleRuntimeException(RuntimeException ex) {
        return "Ha ocurrido un error en la solicitud: " + ex.getMessage();
    }
}
