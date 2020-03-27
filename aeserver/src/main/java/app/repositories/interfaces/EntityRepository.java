package app.repositories.interfaces;

import app.models.interfaces.Identifiable;

import java.util.List;

public interface EntityRepository<E extends Identifiable> {
  List<E> findByQuery(String jpqlName, Object... params);
  List<E> findAll();
  E findById(long id);
  E save(E entity);
  boolean deleteById(long id);
}


