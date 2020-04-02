package app.repositories;

import app.models.Registration;
import app.models.User;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public class UserRepositoryJPA extends AbstractEntityRepositoryJPA<User>{
  public UserRepositoryJPA() {
    super(User.class);
  }
}
