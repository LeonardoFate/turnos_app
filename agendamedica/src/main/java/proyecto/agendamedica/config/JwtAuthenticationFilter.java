package proyecto.agendamedica.config;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import proyecto.agendamedica.util.JwtUtil;


import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // Comprueba que el encabezado contiene el token
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwt); // Extrae el usuario (correo en este caso) del token
            } catch (JwtException e) {
                logger.warn("Token JWT no válido");
            }
        }

        // Si el token es válido y el usuario no está autenticado en el contexto de seguridad
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtil.validateToken(jwt, username)) {
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(username, null, null); // Configura los roles si es necesario
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Establece el contexto de seguridad para esta solicitud
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        chain.doFilter(request, response); // Continúa con el filtro siguiente en la cadena
    }
}
