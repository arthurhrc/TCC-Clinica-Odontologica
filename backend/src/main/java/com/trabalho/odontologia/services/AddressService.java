package com.trabalho.odontologia.services;

import com.trabalho.odontologia.entities.Address;
import com.trabalho.odontologia.repositories.AddressRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressRepository repository;
    

    @Transactional(readOnly = true)
    public Address findById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new RuntimeException("Recurso não encontrado"));
    }

    @Transactional(readOnly = true)
    public List<Address> findAll() {
        return repository.findAll();
    }

    @Transactional()
    public Address insert(Address address) {
        Address entity = new Address();
        saveData(entity, address);
        entity = repository.save(entity);
        return entity;
    }

    @Transactional()
    public Address update(Long id, Address address) {
        try {
            Address entity = repository.getReferenceById(id);
            saveData(entity, address);
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

    private void saveData(Address entity, Address address) {
        entity.setCountry(address.getCountry());
        entity.setState(address.getState());
        entity.setCity(address.getCity());
        entity.setZipCode(address.getZipCode());
        entity.setStreet(address.getStreet());
        entity.setDistrict(address.getDistrict());
        entity.setNumber(address.getNumber());
        entity.setAddressComplement(address.getAddressComplement());
    }
}
