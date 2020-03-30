package app.rest;

import app.models.Registration;
import app.models.helper.AEventStatus;
import app.models.helper.CustomJson;
import app.models.helper.StringGenerator;
import app.repositories.interfaces.EntityRepository;
import app.rest.exceptions.ForregistrationdenException;
import app.rest.exceptions.PreconditionFailedException;
import app.models.AEvent;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
public class AEventsController {
  @Autowired
  private EntityRepository<AEvent> repository;

  @Autowired
  private EntityRepository<Registration> registrationsRepository;

  //SummaryView
  @GetMapping("/aevents")
  public MappingJacksonValue getAllAEvents(@RequestParam Map<String, String> params) {
    List<AEvent> result = null;
    if (params.size() == 0) {
      result = repository.findAll();
    } else if (params.size() > 1) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can only handle one request parameter: title=, status= or minRegistrations=");
    } else if (params.containsKey("title")) {
      String value = params.get("title");
      result =  repository.findByQuery("AEvent_find_by_title", ("%" + value + "%"));
    } else if (params.containsKey("status")) {
      String stringValue = params.get("status").toUpperCase();
      for (AEventStatus e : AEventStatus.values()) {
        if (e.name().equals(stringValue)) {
          AEventStatus value = AEventStatus.valueOf(stringValue);
          result =  repository.findByQuery("AEvent_find_by_status", value);
        }
      }
      if (result == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "status=" + stringValue + " is not a valid AEvent status value.");
      }
    } else if (params.containsKey("minRegistrations")) {
      int value;
      try {
        value = Integer.parseInt(params.get("minRegistrations"));
      } catch (NumberFormatException e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provided request parameter was not a valid number.");
      }
      result =  repository.findByQuery("AEvent_find_by_minRegistrations", value);
    }
    if (result == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid query parameters.");
    }
    MappingJacksonValue value = new MappingJacksonValue(result);
    value.setSerializationView(CustomJson.Summary.class);
    return value;
  }

  //UnrestrictedView
  @GetMapping("/aevents/{id}")
  public MappingJacksonValue getAEvent(@PathVariable int id) {
    AEvent foundEvent = repository.findById(id);
    if (foundEvent == null) {
      throw new ResourceNotFoundException("Could not find AEvent with id: " + id);
    } else {
      return new MappingJacksonValue(foundEvent);
    }
  }

  @PostMapping("/aevents")
  public ResponseEntity<AEvent> addAEvent(@RequestBody AEvent aEvent) {
    if (aEvent.getId() != 0) {
      throw new ForregistrationdenException("AEvent-Id=" + aEvent.getId() + " must be 0.");
    }
    aEvent = repository.save(aEvent);
    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("{id}")
      .buildAndExpand(aEvent.getId())
      .toUri();
    return ResponseEntity.created(location).body(aEvent);
  }

  @RequestMapping(method = {RequestMethod.PUT, RequestMethod.POST}, path = "/aevents/{id}")
  public AEvent updateAEvent(@RequestBody AEvent aEvent, @PathVariable int id) {
    if (aEvent.getId() != id) {
      throw new ForregistrationdenException("AEvent-Id=" + aEvent.getId() + " does not match path parameter=" + id);
    }
    repository.save(aEvent);
    return aEvent;
  }

  @DeleteMapping("/aevents/{id}")
  public boolean deleteAEvent(@PathVariable int id) {
    boolean deleted = repository.deleteById(id);
    if (!deleted) {
      throw new ResourceNotFoundException("Could not find AEvent with id: " + id);
    } else {
      return true;
    }
  }

  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping("/aevents/{id}/register")
  public Registration createNewRegistration(@RequestBody(required = false) LocalDateTime startDateTime, @PathVariable int id) {
    AEvent foundEvent = repository.findById(id);
    if (foundEvent == null) {
      throw new ResourceNotFoundException("Could not find AEvent with id: " + id);
    }
    Registration newRegistration = new Registration();
    newRegistration.setTicketCode(StringGenerator.generateRandomString());
    newRegistration.setPaid(false);
    if (startDateTime == null) {
      newRegistration.setSubmissionDate(LocalDateTime.now());
    } else {
      newRegistration.setSubmissionDate(startDateTime);
    }
    boolean addedRegistration = foundEvent.addRegistration(newRegistration);
    if (!addedRegistration) {
      throw new PreconditionFailedException("AEvent with aEventId=" + foundEvent.getId() + " is not published yet.");
    }
    newRegistration = registrationsRepository.save(newRegistration);
    return registrationsRepository.findById(newRegistration.getId());
  }

  //SummaryView
  @JsonSerialize(using = CustomJson.SummarySerializer.class)
  @GetMapping("/aevents/{id}/registrations")
  public MappingJacksonValue getRegistrationsOfEvent(@PathVariable int id) {
    AEvent foundEvent = repository.findById(id);
    if (foundEvent == null) {
      throw new ResourceNotFoundException("Could not find AEvent with id: " + id);
    }
    if (foundEvent.getStatus() != AEventStatus.PUBLISHED) {
      throw new PreconditionFailedException("AEvent with aEventId=" + foundEvent.getId() + " is not published yet and " +
        "thus has no registrations.");
    }
    if (foundEvent.getRegistrations().size() < 1) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event with id=" + id + " " +
        "does not have any registrations associated with it.");
    }
    MappingJacksonValue value = new MappingJacksonValue(foundEvent.getRegistrations());
    value.setSerializationView(CustomJson.Summary.class);
    return value;
  }

  //UnrestrictedView
  @GetMapping("/aevents/{eventId}/registrations/{registrationId}")
  public MappingJacksonValue getRegistrationOfEventById(@PathVariable int eventId, @PathVariable int registrationId) {
    AEvent foundEvent = repository.findById(eventId);
    if (foundEvent == null) {
      throw new ResourceNotFoundException("Could not find AEvent with id: " + eventId);
    }
    if (foundEvent.getStatus() != AEventStatus.PUBLISHED) {
      throw new PreconditionFailedException("AEvent with aEventId=" + foundEvent.getId() + " is not published yet and " +
        "thus has no registrations.");
    }
    if (foundEvent.getRegistrations().size() < 1) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event with id=" + eventId + " " +
        "does not have any registrations associated with it.");
    }
    List<Registration> listOfRegistrations = foundEvent.getRegistrations();
    Registration foundRegistration = listOfRegistrations.stream()
      .filter(Registration -> Registration.getId() == registrationId)
      .findFirst()
      .orElse(null);
    if (foundRegistration == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Registration with id=" + registrationId +
        " was not found on AEvent with id=" + eventId + ".");
    }
    return new MappingJacksonValue(foundRegistration);
  }
}
