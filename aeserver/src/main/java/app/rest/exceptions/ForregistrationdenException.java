package app.rest.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForregistrationdenException extends RuntimeException {
  public ForregistrationdenException(String message) {
    super(message);
  }
}
