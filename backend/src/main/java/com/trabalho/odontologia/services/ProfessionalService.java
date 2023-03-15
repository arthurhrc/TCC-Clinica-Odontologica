package com.trabalho.odontologia.services;

import com.trabalho.odontologia.entities.Address;
import com.trabalho.odontologia.entities.Professional;
import com.trabalho.odontologia.entities.enums.Specialization;
import com.trabalho.odontologia.repositories.ProfessionalRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProfessionalService {

    @Autowired
    private ProfessionalRepository repository;

    @Autowired
    private AddressService addressService;

    @Transactional(readOnly = true)
    public Professional findById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new RuntimeException("Recurso não encontrado"));
    }

    @Transactional(readOnly = true)
    public List<Professional> findAll(String name, Integer specializationValue) {
        Specialization specialization = null;

        if (specializationValue != null) {
            specialization = Specialization.values()[specializationValue];
        }

        return repository.searchByNameAndSpecialization(name, specialization);
    }

    @Transactional()
    public Professional insert(Professional professional) {
        Professional entity = new Professional();
        saveData(entity, professional);
        entity = repository.save(entity);
        return entity;
    }

    @Transactional()
    public Professional update(Long id, Professional professional) {
        try {
            Professional entity = repository.getReferenceById(id);
            saveData(entity, professional);
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

    private void saveData(Professional entity, Professional professional) {
        entity.setName(professional.getName());
        entity.setEmail(professional.getEmail());
        entity.setPhone(professional.getPhone());
        entity.setCpf(professional.getCpf());
        entity.setBirthdate(professional.getBirthdate());
        entity.setRegistrationDate(LocalDate.now());
        entity.setGender(professional.getGender());
        entity.setRg(professional.getRg());
        entity.setSpecialization(professional.getSpecialization());
        Address professionalAddress = addressService.insert(professional.getAddress());
        entity.setAddress(professionalAddress);
    }

}
