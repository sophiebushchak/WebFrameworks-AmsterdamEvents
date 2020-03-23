package app.rest;

import app.repositories.AEventsRepository;
import models.AEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AEventsController {
  @Autowired
  private AEventsRepository repository;

  @GetMapping("/aevents")
  public List<AEvent> getAllAEvents() {
    return repository.findAll();
  }


}
