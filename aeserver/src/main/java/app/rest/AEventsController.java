package app.rest;

import app.models.Registration;
import app.models.helper.StringGenerator;
import app.repositories.AEventsRepository;
import app.repositories.RegistrationsRepositoryJPA;
import app.rest.exceptions.ForregistrationdenException;
import app.rest.exceptions.PreconditionFailedException;
import com.fasterxml.jackson.annotation.JsonView;
import app.models.AEvent;
import app.models.helper.UserViews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class AEventsController {
  @Autowired
  private AEventsRepository repository;

  @Autowired
  private RegistrationsRepositoryJPA registrationsRepository;

  @JsonView(UserViews.OnlyIdTitleStatus.class)
  @GetMapping("/aevents")
  public List<AEvent> getAllAEvents() {
    return repository.findAll();
  }

  @GetMapping("aevents/{id}")
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
    AEvent savedEvent = repository.save(aEvent);
    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("{id}")
      .buildAndExpand(savedEvent.getId())
      .toUri();
    return ResponseEntity.created(location).body(savedEvent);
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
