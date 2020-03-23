package models;

import com.fasterxml.jackson.annotation.JsonProperty;
import models.helper.AEventStatus;

import java.time.LocalDate;

public class AEvent {
  private static int nextId = 0;
  private int id;
  private String title;
  private String description;
  private AEventStatus status;
  private boolean isTicketed;
  private double participationFee;
  private double maxParticipants;
  private LocalDate start;
  private LocalDate end;

  public AEvent() {
    this.id = nextId++;
  }

  public AEvent(String title) {
    this();
    this.title = title;
  }

  public int getId() {
    return id;
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


  @JsonProperty(value="isTicketed")
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
