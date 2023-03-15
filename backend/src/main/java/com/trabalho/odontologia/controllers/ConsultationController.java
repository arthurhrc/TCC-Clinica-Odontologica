package com.trabalho.odontologia.controllers;

import com.trabalho.odontologia.entities.Consultation;
import com.trabalho.odontologia.entities.Professional;
import com.trabalho.odontologia.services.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/consultations")
public class ConsultationController {

    @Autowired
    private ConsultationService service;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Consultation> findById(@PathVariable Long id) {
        Consultation consultation = service.findById(id);
        return ResponseEntity.ok(consultation);
    }

    @GetMapping
    public ResponseEntity<List<Consultation>> findAll() {
        List<Consultation> list = service.findAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping(value = "/available")
    public ResponseEntity<Map<Long, List<LocalTime>>> getAvailableHours(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam("type") String type) {
        Map<Long, List<LocalTime>> availableHours = service.getAvailableHoursByProfessional(date, type);
        return ResponseEntity.ok(availableHours);
    }

    @GetMapping(value = "/agenda/normal")
    public ResponseEntity<List<Consultation>> getNormalConsultations() {
        List<Consultation> consultations = service.getNormalConsultations();
        return ResponseEntity.ok(consultations);
    }

    @GetMapping(value = "/agenda/cirurgia")
    public ResponseEntity<List<Consultation>> getSurgeonConsultations() {
        List<Consultation> consultations = service.getSurgeonConsultations();
        return ResponseEntity.ok(consultations);
    }

    @GetMapping(value = "/reports/normal")
    public ResponseEntity<List<Consultation>> getNormalReports() {
        List<Consultation> consultations = service.getNormalReports();
        return ResponseEntity.ok(consultations);
    }

    @GetMapping(value = "/reports/cirurgia")
    public ResponseEntity<List<Consultation>> getSurgeonReports() {
        List<Consultation> consultations = service.getSurgeonReports();
        return ResponseEntity.ok(consultations);
    }

    @PostMapping
    public ResponseEntity<Consultation> insert(@RequestBody Consultation consultation) {
        consultation = service.insert(consultation);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(consultation.getId()).toUri();
        return ResponseEntity.created(uri).body(consultation);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Consultation> update(@PathVariable Long id, @RequestBody Consultation consultation) {
        consultation = service.update(id, consultation);
        return ResponseEntity.ok(consultation);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
