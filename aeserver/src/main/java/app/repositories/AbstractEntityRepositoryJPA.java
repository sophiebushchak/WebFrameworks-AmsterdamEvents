package app.repositories;

import app.models.AEvent;
import app.models.interfaces.Identifiable;
import app.repositories.interfaces.EntityRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public abstract class AbstractEntityRepositoryJPA<E extends Identifiable> implements EntityRepository<E> {
  @PersistenceContext
  protected EntityManager entityManager;

  private Class<E> theEntityClass;

  public AbstractEntityRepositoryJPA(Class<E> entityClass) {
    this.theEntityClass = entityClass;
    System.out.println("Created " + this.getClass().getName() + "<" + this.theEntityClass.getSimpleName() + ">");
  }

  @Override
  public List<E> findAll() {
    Query namedQuery = entityManager.createQuery("from " + theEntityClass.getSimpleName());
    return namedQuery.getResultList();
  }

  @Override
  public E findById(long id) {
    return entityManager.find(theEntityClass, id);
  }

  @Override
  public E save(E entity) {
    return entityManager.merge(entity);
  }

  @Override
  public boolean deleteById(long id) {
   E entity = findById(id);
    if (entity == null) {
      return false;
    }
    entityManager.remove(entity);
    return true;
  }
}
