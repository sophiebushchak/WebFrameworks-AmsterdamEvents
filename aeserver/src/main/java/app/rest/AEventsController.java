package app.rest;

import app.models.Registration;
import app.models.helper.AEventStatus;
import app.models.helper.StringGenerator;
import app.repositories.interfaces.AEventsRepository;
import app.repositories.RegistrationsRepositoryJPA;
import app.repositories.interfaces.EntityRepository;
import app.rest.exceptions.ForregistrationdenException;
import app.rest.exceptions.PreconditionFailedException;
import com.fasterxml.jackson.annotation.JsonView;
import app.models.AEvent;
import app.models.helper.UserViews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
public class AEventsController {
  @Autowired
  private EntityRepository<AEvent> repository;

  @Autowired
  private EntityRepository<Registration> registrationsRepository;


  @GetMapping("/aevents")
  public List<AEvent> getAllAEvents(@RequestParam Map<String,String> params) {
    if (params.size() == 0) {
      return repository.findAll();
    }
    if (params.size() > 1) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can only handle one request parameter: title=, status= or minRegistrations=");
    }
    if (params.containsKey("title")) {
      String value = params.get("title");
      return repository.findByQuery("AEvent_find_by_title", ("%" + value + "%"));
    }
    if (params.containsKey("status")) {
      String stringValue = params.get("status").toUpperCase();
      for (AEventStatus e : AEventStatus.values()) {
        if (e.name().equals(stringValue)) {
          AEventStatus value = AEventStatus.valueOf(stringValue);
          return repository.findByQuery("AEvent_find_by_status", value);
        }
      }
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "status=" + stringValue + " is not a valid AEvent status value.");
    }
    if (params.containsKey("minRegistrations")) {
      int value;
      try {
        value = Integer.parseInt(params.get("minRegistrations"));
      } catch (NumberFormatException e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provided request parameter was not a valid number.");
      }
      return repository.findByQuery("AEvent_find_by_minRegistrations", value);
    }
    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid query parameters.");
  }

/*  @GetMapping("/aevents")
  public List<AEvent> getAllAEvents(@RequestParam(required = false) String title,
                                    @RequestParam(required = false) AEventStatus status,
                                    @RequestParam(required = false) int minRegistrations) {}*/

  @GetMapping("/aevents/{id}")
  public AEvent getAEvent(@PathVariable int id) {
    AEvent foundEvent = repository.findById(id);
    if (foundEvent == null) {
      throw new ResourceNotFoundException("Could not find AEvent with id: " + id);
    } else {
      return foundEvent;
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
    AEvent foundEvent = this.getAEvent(id);
    Registration newRegistration = new Registration();
    newRegistration.setTicketCode(StringGenerator.generateRandomString());
    newRegistration.setPaid(false);
    if(startDateTime == null) {
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
}
