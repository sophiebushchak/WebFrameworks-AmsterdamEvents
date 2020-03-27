package app.repositories;

import app.models.AEvent;
import app.repositories.interfaces.AEventsRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Component
public class AEventsRepositoryMock implements AEventsRepository {
  private List<AEvent> aEvents;
  private int nextId;

  public List<AEvent> findAll() {
    return this.aEvents;
  }

  public AEvent findById(long id) {
    return aEvents.stream()
      .filter(AEvent -> AEvent.getId() == id)
      .findFirst()
      .orElse(null);
  }

  public AEvent save(AEvent aEvent) {
    if (aEvent.getId() == 0) {
      this.aEvents.add(aEvent);
      aEvent.setId(10000 + ++nextId);
    } else {
      AEvent foundEvent = aEvents.stream()
        .filter(AEvent -> AEvent.getId() == aEvent.getId())
        .findFirst()
        .orElse(null);
      if (foundEvent != null) {
        aEvents.set(aEvents.indexOf(foundEvent), aEvent);
      } else {
        this.aEvents.add(aEvent);
      }
    }
    return aEvent;
  }

  public boolean deleteById(long id) {
    Predicate<AEvent> condition = aEvent -> aEvent.getId() == id;
    return aEvents.removeIf(condition);
  }

  public AEventsRepositoryMock() {
    this.aEvents = new ArrayList<>();
  }

  public AEventsRepositoryMock(List<AEvent> aEvents) {
    this();
    this.aEvents = aEvents;
  }
}
