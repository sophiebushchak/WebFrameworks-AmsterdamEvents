package app.rest;

import app.repositories.interfaces.EntityRepository;
import app.rest.security.JWToken;
import app.rest.security.PasswordEncoder;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
  @Autowired
  EntityRepository<User> userRepo;
  @Autowired
  private JWToken tokenGenerator;
  @Autowired
  private PasswordEncoder encoder;

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

    User user = new User(email);

    String tokenString = tokenGenerator.encode(user.getName(), user.getId(), user.isAdmin());
    return ResponseEntity
      .status(HttpStatus.ACCEPTED)
      .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString)
      .body(user);
  }
}
