package app.repositories;

import models.AEvent;

import java.util.List;

public interface AEventsRepository {
   List<AEvent> findAll();
}
