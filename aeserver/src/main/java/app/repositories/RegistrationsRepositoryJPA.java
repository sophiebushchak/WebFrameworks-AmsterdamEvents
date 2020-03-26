package app.repositories;

import app.models.AEvent;
import app.models.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class RegistrationsRepositoryJPA {
  @Autowired
  EntityManager entityManager;

  public List<Registration> findAll() {
    TypedQuery<Registration> namedQuery = entityManager.createNamedQuery("find_all_registrations", Registration.class);
    return namedQuery.getResultList();
  }

  public Registration findById(long id) {
    return entityManager.find(Registration.class, id);
  }

  public Registration save(Registration registration) {
    return entityManager.merge(registration);
  }

  public boolean deleteById(long id) {
    Registration registration = findById(id);
    if (registration == null) {
      return false;
    }
    entityManager.remove(registration);
    return true;
  }
}
