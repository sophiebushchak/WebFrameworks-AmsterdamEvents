package app.repositories;

import models.AEvent;
import models.helper.AEventStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
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
    AEvent foundEvent;
    if (aEvent.getId() == 0) {
      this.aEvents.add(aEvent);
      aEvent.setId(10000 + ++nextId);
      foundEvent = aEvent;
    } else {
      foundEvent = aEvents.stream()
        .filter(AEvent -> AEvent.getId() == aEvent.getId())
        .findFirst()
        .orElse(null);
      if (foundEvent != null) {
        aEvents.set(aEvents.indexOf(foundEvent), aEvent);
      }
    }
    return foundEvent;
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

  private AEvent generateRandomAEvent() {
    AEvent newEvent = new AEvent();
    newEvent.setTitle("A Random Event");
    newEvent.setDescription("This event was randomly generated.");
    newEvent.setStatus(AEventStatus.DRAFT);
    newEvent.setTicketed(Math.random() > 0.5);
    if (newEvent.isTicketed()) {
      newEvent.setParticipationFee((Math.random() * 15) + 1);
      newEvent.setParticipationFee((Math.random() * 2000) + 100);
    }
    newEvent.setStart(LocalDate.now());
    newEvent.setEnd(LocalDate.of(2020, (int)(Math.random() * 6) + 5, 1));
    return newEvent;
  }
}
