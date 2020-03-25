package models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import models.helper.AEventStatus;
import models.helper.UserViews;

import java.time.LocalDate;

public class AEvent {
  @JsonView(UserViews.OnlyIdTitleStatus.class)
  private long id;

  @JsonView(UserViews.OnlyIdTitleStatus.class)
  private String title;

  private String description;

  @JsonView(UserViews.OnlyIdTitleStatus.class)
  private AEventStatus status;

  private boolean isTicketed;
  private double participationFee;
  private double maxParticipants;
  private LocalDate start;
  private LocalDate end;

  public AEvent() {
  }

  public AEvent(String title) {
    this();
    this.title = title;
  }

  public AEvent(String title, String description, AEventStatus status, boolean isTicketed, double participationFee, double maxParticipants, LocalDate start, LocalDate end) {
    this(title);
    this.description = description;
    this.status = status;
    this.isTicketed = isTicketed;
    this.participationFee = participationFee;
    this.maxParticipants = maxParticipants;
    this.start = start;
    this.end = end;
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

  public void setMaxParticipants(double maxParticipants) {
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
}
