package proyecto.agendamedica.util;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PushNotificationService {

    private final String SERVER_KEY = "BJyHEQIpsn3u5j6ZfcdvMDvjIuhsM02hW5rG3Bg_W_wi_tjvIAZukOAg6zF0LcZYDstmG1-JXtVWZlmcYz-ZjSo";

    public void sendNotification(String token, String title, String body) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "key=" + SERVER_KEY);
            headers.set("Content-Type", "application/json");

            String payload = "{"
                    + "\"to\":\"" + token + "\","
                    + "\"notification\":{"
                    + "\"title\":\"" + title + "\","
                    + "\"body\":\"" + body + "\""
                    + "}"
                    + "}";

            HttpEntity<String> request = new HttpEntity<>(payload, headers);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(
                    "https://fcm.googleapis.com/fcm/send", HttpMethod.POST, request, String.class);

            System.out.println("Notificación enviada: " + response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}