package proyecto.agendamedica.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "kOwuf0RHMxJ8GJ9LKJ3YjSaZ8A0fK3xX7G5YqI4yU2t";
    private final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 15; // 15 minutos
    private final long REFRESH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24 * 7; // 7 días

    private Key getSigningKey() {
        return new SecretKeySpec(Base64.getDecoder().decode(SECRET_KEY), SignatureAlgorithm.HS256.getJcaName());
    }

    // Token expitacion
    public String generateAccessToken(String correo) {
        return Jwts.builder()
                .setSubject(correo)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
                .signWith(getSigningKey())
                .compact();
    }

    // Refresh token
    public String generateRefreshToken(String correo) {
        return Jwts.builder()
                .setSubject(correo)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
                .signWith(getSigningKey())
                .compact();
    }

    // Extrae el correo (sujeto) del token
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    // Validacion de token que sea valido y no este expirado
    public boolean validateToken(String token, String correo) {
        try {
            String username = extractUsername(token);
            return (username.equals(correo) && !isTokenExpired(token));
        } catch (SignatureException e) {
            // Maneja la excepción si la firma es inválida
            return false;
        }
    }

    // Comprobar si el token esta expirado
    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    // Obtiene todos los claims (datos) del token
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
