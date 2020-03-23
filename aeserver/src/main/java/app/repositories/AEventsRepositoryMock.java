package app.repositories;

import models.AEvent;
import models.helper.AEventStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class AEventsRepositoryMock implements AEventsRepository {
  private List<AEvent> aEvents;

  public AEventsRepositoryMock() {
    this.aEvents = new ArrayList<>();
    for (int i = 0; i < 7; i++) {
      this.aEvents.add(generateRandomAEvent());
    }
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
    newEvent.setEnd(LocalDate.of(2020, (int)(Math.random() * 11) + 1, 1));
    return newEvent;
  }

  public List<AEvent> findAll() {
    return this.aEvents;
  }
}
