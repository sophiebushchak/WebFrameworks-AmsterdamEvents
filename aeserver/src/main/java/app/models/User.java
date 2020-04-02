package app.models;

import app.models.interfaces.Identifiable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static java.lang.String.valueOf;

@Entity
public class User implements Identifiable {
  @Id
  private long id;

  private String name;

  private String email;

  @JsonIgnore
  private String hashedPassword;

  private boolean admin;

  public User() {
  }

  public User(String email) {
    this.id = Math.abs(email.hashCode());
    this.email = email;
    this.name = email.split("@")[0];
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getHashedPassword() {
    return hashedPassword;
  }

  public void setHashedPassword(String hashedPassword) {
    this.hashedPassword = hashedPassword;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }
}
