package com.trabalho.odontologia.controllers;

import com.trabalho.odontologia.entities.Client;
import com.trabalho.odontologia.entities.User;
import com.trabalho.odontologia.services.ClientService;
import com.trabalho.odontologia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/clients")
public class ClientController {

    @Autowired
    private ClientService service;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Client> findById(@PathVariable Long id) {
        Client client = service.findById(id);
        return ResponseEntity.ok(client);
    }

    @GetMapping
    public ResponseEntity<List<Client>> findAll(@RequestParam(name = "name", defaultValue = "") String name) {
        List<Client> list = service.findAll(name);
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<Client> insert(@RequestBody Client client) {
        client = service.insert(client);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(client.getId()).toUri();
        return ResponseEntity.created(uri).body(client);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Client> update(@PathVariable Long id, @RequestBody Client client) {
        client = service.update(id, client);
        return ResponseEntity.ok(client);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
