package app.repositories;

import app.models.AEvent;
import app.repositories.interfaces.AEventsRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Primary
@Repository
@Transactional
public class AEventsRepositoryJPA extends AbstractEntityRepositoryJPA<AEvent> {
  public AEventsRepositoryJPA() {
    super(AEvent.class);
  }
}

/*
  @PersistenceContext
  EntityManager entityManager;

  @Override
  public List<AEvent> findAll() {
    TypedQuery<AEvent> namedQuery = entityManager.createNamedQuery("find_all_aevents", AEvent.class);
    return namedQuery.getResultList();
  }

  @Override
  public AEvent findById(long id) {
    return entityManager.find(AEvent.class, id);
  }

  @Override
  public AEvent save(AEvent aEvent) {
    return entityManager.merge(aEvent);
  }

  @Override
  public boolean deleteById(long id) {
    AEvent aEvent = findById(id);
    if (aEvent == null) {
      return false;
    }
    entityManager.remove(aEvent);
    return true;
  }
}
*/
