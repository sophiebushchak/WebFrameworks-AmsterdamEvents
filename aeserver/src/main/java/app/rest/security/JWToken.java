package app.rest.security;

import app.rest.exceptions.AuthenticationException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JWToken {
  // A claim indicating if the user is an administrator
  private static final String JWT_USERNAME_CLAIM = "sub";
  private static final String JWT_USERID_CLAIM = "id";
  private static final String JWT_ADMIN_CLAIM = "admin";

  @Value("${jwt.issuer:MyOrganisation}")
  private String issuer;

  @Value("${jwt.pass-phrase}")
  private String passphrase;

  @Value("${jwt.expiration-seconds}")
  private int expiration;

  public String encode(String username, long userid, boolean admin) {

    Key key = getKey(passphrase);

    String token = Jwts.builder()
      .claim(JWT_USERNAME_CLAIM, username)
      .claim(JWT_USERID_CLAIM, Long.toString(userid))
      .claim(JWT_ADMIN_CLAIM, Boolean.toString(admin)) // public claim
      .setIssuer(issuer) // registered claim
      .setIssuedAt(new Date()) // registered claim
      .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000)) // registered claim
      .signWith(key, SignatureAlgorithm.HS512)
      .compact();
    return token;
  }

  /**
   * Get the secret key
   * @param passPhrase
   * @return
   */
  private Key getKey(String passPhrase) {
    byte hmacKey[] = passPhrase.getBytes(StandardCharsets.UTF_8);
    Key key = new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
    return key;
  }

  /**
   * Decode the given token, returning an object with useful token data
   * @param encodedToken
   * @return
   * @throws AuthenticationException for expired, malformed tokens
   */
  public JWTokenInfo decode(String encodedToken) throws AuthenticationException {
    try {
      // Validate the token
      Key key = getKey(passphrase);
      Jws<Claims> jws = Jwts.parser().setSigningKey(key).parseClaimsJws(encodedToken);
      Claims claims = jws.getBody();

      JWTokenInfo tokenInfo = new JWTokenInfo();

      tokenInfo.setId(Long.parseLong(claims.get(JWT_USERID_CLAIM).toString()));

      tokenInfo.setUsername(claims.get(JWT_USERNAME_CLAIM).toString());

      tokenInfo.setAdmin(Boolean.parseBoolean(claims.get(JWT_ADMIN_CLAIM).toString()));

      return tokenInfo;

    } catch (ExpiredJwtException | MalformedJwtException |
      UnsupportedJwtException | IllegalArgumentException| SignatureException e) {
      throw new AuthenticationException(e.getMessage());
    }
  }

}
