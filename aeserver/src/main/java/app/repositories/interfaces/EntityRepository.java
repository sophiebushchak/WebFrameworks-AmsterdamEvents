package app.repositories.interfaces;

import app.models.interfaces.Identifiable;

import java.util.List;

public interface EntityRepository<E extends Identifiable> {
  List<E> findAll();
  E findById(long id);
  E save(E entity);
  boolean deleteById(long id);
}


