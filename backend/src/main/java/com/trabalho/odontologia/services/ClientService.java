package com.trabalho.odontologia.services;

import com.trabalho.odontologia.entities.Address;
import com.trabalho.odontologia.entities.Client;
import com.trabalho.odontologia.repositories.ClientRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository repository;

    @Autowired
    private AddressService addressService;

    @Transactional(readOnly = true)
    public Client findById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new RuntimeException("Recurso não encontrado"));
    }

    @Transactional(readOnly = true)
    public List<Client> findAll(String name) {
        return repository.searchByName(name);
    }

    @Transactional()
    public Client insert(Client client) {
        Client entity = new Client();
        saveData(entity, client);
        entity = repository.save(entity);
        return entity;
    }

    @Transactional()
    public Client update(Long id, Client client) {
        try {
            Client entity = repository.getReferenceById(id);
            saveData(entity, client);
            entity = repository.save(entity);
            return entity;
        }
        catch (EntityNotFoundException e) {
            throw new RuntimeException("Recurso não encontrado");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Recurso não encontrado");
        }
        try {
            repository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Falha de integridade referencial");
        }
    }

    private void saveData(Client entity, Client client) {
        entity.setName(client.getName());
        entity.setCpf(client.getCpf());
        entity.setBirthdate(client.getBirthdate());
        entity.setRegistrationDate(LocalDate.now());
        entity.setGender(client.getGender());
        entity.setRg(client.getRg());
        entity.setEmail(client.getEmail());
        entity.setPhone(client.getPhone());
        entity.setMaritalStatus(client.getMaritalStatus());

        Address clientAddress = addressService.insert(client.getAddress());
        entity.setAddress(clientAddress);


    }

}
