package com.trabalho.odontologia.services;

import com.trabalho.odontologia.entities.Address;
import com.trabalho.odontologia.entities.User;
import com.trabalho.odontologia.repositories.UserRepository;
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
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private AddressService addressService;

    @Transactional(readOnly = true)
    public User findById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new RuntimeException("Recurso não encontrado"));
    }

    @Transactional(readOnly = true)
    public List<User> findAll(String name) {
        return repository.searchByName(name);
    }

    @Transactional()
    public User insert(User user) {
        User entity = new User();
        saveData(entity, user);
        entity = repository.save(entity);
        return entity;
    }

    @Transactional()
    public User update(Long id, User user) {
        try {
            User entity = repository.getReferenceById(id);
            saveData(entity, user);
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

    public User login(String username) {
        return repository.findByUsername(username);
    }

    private void saveData(User entity, User user) {
        entity.setName(user.getName());
        entity.setCpf(user.getCpf());
        entity.setBirthdate(user.getBirthdate());
        entity.setRegistrationDate(LocalDate.now());
        entity.setGender(user.getGender());
        entity.setUsername(user.getUsername());
        entity.setRg(user.getRg());
        entity.setEmail(user.getEmail());
        entity.setPhone(user.getPhone());
        entity.setPassword(user.getPassword());
        entity.setRole(user.getRole());

        Address userAddress = addressService.insert(user.getAddress());
        entity.setAddress(userAddress);
    }
}
