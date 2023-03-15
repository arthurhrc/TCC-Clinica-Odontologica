package com.trabalho.odontologia.repositories;

import com.trabalho.odontologia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    @Query("SELECT obj FROM User obj " +
            "WHERE UPPER(obj.name) LIKE UPPER(CONCAT(:name, '%'))")
    List<User> searchByName(String name);
}
