package com.trabalho.odontologia.repositories;

import com.trabalho.odontologia.entities.Professional;
import com.trabalho.odontologia.entities.enums.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfessionalRepository extends JpaRepository<Professional, Long> {

    @Query("SELECT obj FROM Professional obj " +
            "WHERE (:name IS NULL OR UPPER(obj.name) LIKE UPPER(CONCAT(:name, '%'))) " +
            "AND (:specialization IS NULL OR obj.specialization = :specialization)")
    List<Professional> searchByNameAndSpecialization(String name, Specialization specialization);

    @Query("SELECT obj FROM Professional obj " +
            "WHERE (:specialization IS NULL OR obj.specialization = :specialization)")
    List<Professional> searchBySpecialization(Specialization specialization);




}