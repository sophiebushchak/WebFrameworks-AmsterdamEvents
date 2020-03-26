package app;

import app.models.AEvent;
import app.models.Registration;
import app.models.helper.AEventStatus;
import app.models.helper.StringGenerator;
import app.repositories.AEventsRepository;
import app.repositories.RegistrationsRepositoryJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class AEServerApplication implements CommandLineRunner {

  @Autowired
  AEventsRepository aEventRepo;
  @Autowired
  RegistrationsRepositoryJPA regRepo;
  @Autowired
  EntityManager entityManager;

  public static void main(String[] args) {
    SpringApplication.run(AEServerApplication.class, args);
  }

  @Override
  @Transactional
  public void run(String... args) throws Exception {
    this.createInitialData();
  }

  @Transactional
  protected void createInitialData() {
    List<AEvent> aEvents = this.aEventRepo.findAll();
    if (aEvents.size() > 0) return;
    System.out.println("Configuring some initial aEvent data");
    for (int i = 0; i < 20; i++) {
      AEvent randomEvent = AEvent.generateRandomAEvent();
      this.aEventRepo.save(randomEvent);
    }
    System.out.println("Initial aEvent data configured.");
    System.out.println("-----------------------------");
    System.out.println("Configuring some initial Registration data.");
    aEvents = this.aEventRepo.findAll();
    for (AEvent aEvent : aEvents) {
      if (aEvent.getStatus() == AEventStatus.PUBLISHED) {
        for (int i = 0; i < 3; i++) {
          Registration newRegistration = new Registration();
          newRegistration.setTicketCode(StringGenerator.generateRandomString());
          newRegistration.setPaid(Math.random() > 0.5);
          newRegistration.setSubmissionDate(LocalDateTime.now());
          aEvent.addRegistration(newRegistration);
          this.regRepo.save(newRegistration);
        }
      }
    }
    System.out.println("Initial Registration data configured.");
  }
}
