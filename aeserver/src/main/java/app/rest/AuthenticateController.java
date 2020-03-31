package app.rest;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import app.models.User;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@RestController
public class AuthenticateController {
  @PersistenceContext
  EntityManager em;

  @PostMapping("/authenticate/login")
  public ResponseEntity<User> login(@RequestBody ObjectNode emailAndPassword) {
    if (emailAndPassword.get("email") == null || emailAndPassword.get("password") == null || emailAndPassword.size() > 2) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password were not provided or excessive JSON fields");
    }
    String email = emailAndPassword.at("/email").asText();
    String password = emailAndPassword.at("/password").asText();
    if (email == null || !email.split("@")[0].equals(password)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Cannot authenticate user by email=" + email +
        " and password=" + password);
    }
    User createdUser = new User(email, password);
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(createdUser);
  }
}
