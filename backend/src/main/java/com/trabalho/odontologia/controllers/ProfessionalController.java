package com.trabalho.odontologia.controllers;

import com.trabalho.odontologia.entities.Client;
import com.trabalho.odontologia.entities.Professional;
import com.trabalho.odontologia.entities.enums.Specialization;
import com.trabalho.odontologia.services.ClientService;
import com.trabalho.odontologia.services.ProfessionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/professionals")
public class ProfessionalController {

    @Autowired
    private ProfessionalService service;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Professional> findById(@PathVariable Long id) {
        Professional professional = service.findById(id);
        return ResponseEntity.ok(professional);
    }

    @GetMapping
    public ResponseEntity<List<Professional>> findAll(
            @RequestParam(name = "name", defaultValue = "") String name,
            @RequestParam(name = "specialization", defaultValue = "") Integer specialization) {
        List<Professional> list = service.findAll(name, specialization);
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<Professional> insert(@RequestBody Professional professional) {
        professional = service.insert(professional);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(professional.getId()).toUri();
        return ResponseEntity.created(uri).body(professional);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Professional> update(@PathVariable Long id, @RequestBody Professional professional) {
        professional = service.update(id, professional);
        return ResponseEntity.ok(professional);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
