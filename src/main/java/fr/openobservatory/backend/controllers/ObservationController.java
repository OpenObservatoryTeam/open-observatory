package fr.openobservatory.backend.controllers;

import fr.openobservatory.backend.dto.ObservationDto;
import fr.openobservatory.backend.services.ObservationService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/observations")
public class ObservationController {

  private final ObservationService observationService;

  // ---

  @GetMapping("/nearby")
  public ResponseEntity<List<ObservationDto>> nearbyObservations(
      @RequestParam Double lng, @RequestParam Double lat) {
    return ResponseEntity.ok(observationService.findNearbyObservations(lng, lat));
  }

  @GetMapping
  public ResponseEntity<List<ObservationDto>> observations(int limit, int page) {
    return ResponseEntity.ok(observationService.search(limit, page));
  }
}
