package app.rest.security;

import app.rest.exceptions.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {
  @Autowired
  JWToken jwToken;

  private static final Set<String> SECURED_PATHS =
    Set.of("/aevents", "/users");

  @Override
  protected void doFilterInternal(HttpServletRequest req,
                                  HttpServletResponse res,
                                  FilterChain chain) throws ServletException, IOException {
    try {
      String path = req.getServletPath();

      if (HttpMethod.OPTIONS.matches(req.getMethod()) ||
        SECURED_PATHS.stream().noneMatch(path::startsWith)) {
        chain.doFilter(req, res);
        return;
      }

      String encodedToken = req.getHeader(HttpHeaders.AUTHORIZATION);
      System.out.println("Token provided: " + encodedToken);

      if(encodedToken == null) {
        throw new AuthenticationException("Authentication problem");
      }

      encodedToken = encodedToken.replace("Bearer ", "");

      JWTokenInfo tokenInfo =  jwToken.decode(encodedToken);

      req.setAttribute(tokenInfo.KEY, tokenInfo);

      chain.doFilter(req, res);

    } catch(AuthenticationException e ) {
      res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication error");
      return;
    }

  }

}
