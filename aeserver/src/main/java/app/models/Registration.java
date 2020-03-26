package app.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NamedQuery(name = "find_all_registrations", query = "SELECT r FROM Registration r")
public class Registration {
  @Id
  @GeneratedValue
  private long id;
  private String ticketCode;
  private boolean paid;
  private LocalDateTime submissionDate;

  @ManyToOne
  private AEvent associatedAEvent;

  public Registration() {
  }

  public Registration(String ticketCode, boolean paid, LocalDateTime submissionDate) {
    this.ticketCode = ticketCode;
    this.paid = paid;
    this.submissionDate = submissionDate;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTicketCode() {
    return ticketCode;
  }

  public void setTicketCode(String ticketCode) {
    this.ticketCode = ticketCode;
  }

  public boolean isPaid() {
    return paid;
  }

  public void setPaid(boolean paid) {
    this.paid = paid;
  }

  public LocalDateTime getSubmissionDate() {
    return submissionDate;
  }

  public void setSubmissionDate(LocalDateTime submissionDate) {
    this.submissionDate = submissionDate;
  }

  public AEvent getAssociatedAEvent() {
    return associatedAEvent;
  }

  public void setAssociatedAEvent(AEvent associatedAEvent) {
    this.associatedAEvent = associatedAEvent;
  }
}
