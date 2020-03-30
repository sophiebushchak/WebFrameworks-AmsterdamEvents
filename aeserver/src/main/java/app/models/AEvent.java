package app.models;

import app.models.helper.CustomJson;
import app.models.interfaces.Identifiable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import app.models.helper.AEventStatus;
import app.models.helper.UserViews;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Entity
@NamedQueries(
  {
    @NamedQuery(
      name="AEvent_find_by_status",
      query = "SELECT e FROM AEvent e WHERE e.status = ?1"
    ),
    @NamedQuery(
      name="AEvent_find_by_title",
      query = "SELECT e FROM AEvent e WHERE lower(e.title) LIKE ?1"
    ),
    @NamedQuery(
      name="AEvent_find_by_minRegistrations",
      query = "SELECT e FROM AEvent e where SIZE(e.registrations) >= ?1"
    )
  }
)
public class AEvent implements Identifiable {
  @Id
  @GeneratedValue
  @JsonView(CustomJson.Shallow.class)
  private long id;

  @JsonView(CustomJson.Shallow.class)
  private String title;

  private String description;

  @Enumerated(EnumType.STRING)
  @JsonView(CustomJson.Shallow.class)
  private AEventStatus status;

  @JsonView(CustomJson.Summary.class)
  private boolean isTicketed;

  @JsonView(CustomJson.Summary.class)
  private double participationFee;

  private int maxParticipants;

  @JsonView(CustomJson.Summary.class)
  private LocalDate start;

  private LocalDate end;

  @OneToMany(mappedBy = "associatedAEvent", fetch = FetchType.LAZY)
  @JsonSerialize(using = CustomJson.ShallowSerializer.class)
  private List<Registration> registrations = new ArrayList<>();

  public AEvent() {
  }

  public AEvent(String title, String description, AEventStatus status, boolean isTicketed, double participationFee,
                int maxParticipants, LocalDate start, LocalDate end) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.isTicketed = isTicketed;
    this.participationFee = participationFee;
    this.maxParticipants = maxParticipants;
    this.start = start;
    this.end = end;
  }

  public boolean addRegistration(Registration registration) {
    if (registration == null || this.status != AEventStatus.PUBLISHED) {
      return false;
    }
    this.registrations.add(registration);
    registration.setAssociatedAEvent(this);
    return true;
  }

  public void removeRegistration(Registration registration) {
    this.registrations.remove(registration);
    registration.setAssociatedAEvent(null);
  }

  public List<Registration> getRegistrations() {
    return registrations;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public AEventStatus getStatus() {
    return status;
  }

  public void setStatus(AEventStatus status) {
    this.status = status;
  }



  @JsonProperty(value = "isTicketed")
  public boolean isTicketed() {
    return isTicketed;
  }

  public void setTicketed(boolean isTicketed) {
    this.isTicketed = isTicketed;
  }


  public double getParticipationFee() {
    return participationFee;
  }

  public void setParticipationFee(double participationFee) {
    this.participationFee = participationFee;
  }

  public double getMaxParticipants() {
    return maxParticipants;
  }

  public void setMaxParticipants(int maxParticipants) {
    this.maxParticipants = maxParticipants;
  }

  public LocalDate getStart() {
    return start;
  }

  public void setStart(LocalDate start) {
    this.start = start;
  }

  public LocalDate getEnd() {
    return end;
  }

  public void setEnd(LocalDate end) {
    this.end = end;
  }

  public static AEvent generateRandomAEvent() {
    AEvent newEvent = new AEvent();
    newEvent.setTitle("A Random Event");
    newEvent.setDescription("This event was randomly generated.");
    newEvent.setStatus(AEventStatus.values()[new Random().nextInt(AEventStatus.values().length)]);
    newEvent.setTicketed(Math.random() > 0.5);
    if (newEvent.isTicketed()) {
      newEvent.setParticipationFee(Math.floor((Math.random() * 15) + 1));
      newEvent.setMaxParticipants((int) (Math.floor(((Math.random() * 20) + 10)) * 10));
    }
    newEvent.setStart(LocalDate.now().plusDays(new Random().nextInt(7)));
    newEvent.setEnd(LocalDate.now().plusDays(new Random().nextInt(7) + 7));
    return newEvent;
  }
}
