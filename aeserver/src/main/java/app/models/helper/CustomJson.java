package app.models.helper;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;

public class CustomJson {
  public static class Shallow {
  }

  public static class Summary extends Shallow {
  }

  public static class ShallowSerializer extends JsonSerializer<Object> {
    @Override
    public void serialize(Object object, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
      throws IOException, JsonProcessingException {
      System.out.println("Serializing with shallow serializer..");
      ObjectMapper mapper = new ObjectMapper()
        .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false)
        .setSerializationInclusion(JsonInclude.Include.NON_NULL);

      mapper.registerModule(new JavaTimeModule())
        .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

      mapper.setConfig(mapper.getSerializationConfig().withView(CustomJson.Shallow.class));

      jsonGenerator.setCodec(mapper);
      jsonGenerator.writeObject(object);
    }
  }

  public static class SummarySerializer extends JsonSerializer<Object> {
    @Override
    public void serialize(Object object, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
      throws IOException, JsonProcessingException {
      System.out.println("Serializing with summary serializer..");
      ObjectMapper mapper = new ObjectMapper()
        .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false)
        .setSerializationInclusion(JsonInclude.Include.NON_NULL);

      mapper.registerModule(new JavaTimeModule())
        .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

      mapper.setConfig(mapper.getSerializationConfig()
        .withView(CustomJson.Summary.class));

      jsonGenerator.setCodec(mapper);
      jsonGenerator.writeObject(object);
    }
  }

  public static class UnrestrictedSerializer extends JsonSerializer<Object> {
    @Override
    public void serialize(Object object, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
      throws IOException, JsonProcessingException {
      System.out.println("Serializing with unrestricted serializer..");
      ObjectMapper mapper = new ObjectMapper()
        .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, true)
        .setSerializationInclusion(JsonInclude.Include.ALWAYS);

      mapper.registerModule(new JavaTimeModule())
        .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

      jsonGenerator.setCodec(mapper);
      jsonGenerator.writeObject(object);
    }
  }
}

