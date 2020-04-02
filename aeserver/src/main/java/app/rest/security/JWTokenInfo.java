package app.rest.security;

public class JWTokenInfo {

  public static final String KEY = "tokenInfo";

  private long id;
  private String username;
  private boolean admin;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public boolean isAdmin() {
    return admin;
  }
  public void setAdmin(boolean admin) {
    this.admin = admin;
  }
}
