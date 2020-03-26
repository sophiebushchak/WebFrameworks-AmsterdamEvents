package app.models.helper;

import java.util.Random;

public class StringGenerator {
  //Code retrieved from: https://www.baeldung.com/java-random-string
  public static String generateRandomString() {
    int leftLimit = 65; // letter 'A'
    int rightLimit = 122; // letter 'z'
    int targetStringLength = 8;
    Random random = new Random();
    StringBuilder buffer = new StringBuilder(targetStringLength);
    for (int i = 0; i < targetStringLength; i++) {
      int randomLimitedInt = leftLimit + (int)
        (random.nextFloat() * (rightLimit - leftLimit + 1));
      buffer.append((char) randomLimitedInt);
    }
    return buffer.toString();
  }
}
