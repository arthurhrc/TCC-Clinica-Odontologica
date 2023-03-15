package com.trabalho.odontologia.repositories;

import com.trabalho.odontologia.entities.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {

    @Query("SELECT obj FROM Consultation obj WHERE obj.consultDate = :consultDate " +
            "AND obj.professional.id = :id")
    List<Consultation> searchReservedConsultationsByConsultDateAndProfessional(LocalDate consultDate, Long id);

    List<Consultation> findByTypeAndConsultDateGreaterThanEqualOrderByConsultDateAscHourInitAsc(String type, LocalDate date);

    List<Consultation> findByTypeAndConsultDateLessThanOrderByConsultDateAscHourInitAsc(String type, LocalDate consultDate);



}
