package com.trabalho.odontologia.repositories;

import com.trabalho.odontologia.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query("SELECT obj FROM Client obj " +
            "WHERE UPPER(obj.name) LIKE UPPER(CONCAT(:name, '%'))")
    List<Client> searchByName(String name);
}
