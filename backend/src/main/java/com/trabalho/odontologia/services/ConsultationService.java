package com.trabalho.odontologia.services;

import com.trabalho.odontologia.entities.Consultation;
import com.trabalho.odontologia.entities.Professional;
import com.trabalho.odontologia.entities.enums.Specialization;
import com.trabalho.odontologia.repositories.ConsultationRepository;
import com.trabalho.odontologia.repositories.ProfessionalRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class ConsultationService {

    @Autowired
    private ConsultationRepository repository;

    @Autowired
    private ProfessionalRepository professionalRepository;
    

    @Transactional(readOnly = true)
    public Consultation findById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new RuntimeException("Recurso não encontrado"));
    }

    @Transactional(readOnly = true)
    public List<Consultation> findAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Consultation> getNormalConsultations() {
        return repository.findByTypeAndConsultDateGreaterThanEqualOrderByConsultDateAscHourInitAsc("normal", LocalDate.now());
    }

    @Transactional(readOnly = true)
    public List<Consultation> getSurgeonConsultations() {
        return repository.findByTypeAndConsultDateGreaterThanEqualOrderByConsultDateAscHourInitAsc("cirurgia", LocalDate.now());
    }

    @Transactional(readOnly = true)
    public List<Consultation> getNormalReports() {
        return repository.findByTypeAndConsultDateLessThanOrderByConsultDateAscHourInitAsc("normal", LocalDate.now());
    }

    @Transactional(readOnly = true)
    public List<Consultation> getSurgeonReports() {
        return repository.findByTypeAndConsultDateLessThanOrderByConsultDateAscHourInitAsc("cirurgia", LocalDate.now());
    }

    @Transactional()
    public Consultation insert(Consultation consultation) {
        Consultation entity = new Consultation();
        saveData(entity, consultation);
        entity = repository.save(entity);
        return entity;
    }

    @Transactional()
    public Consultation update(Long id, Consultation consultation) {
        try {
            Consultation entity = repository.getReferenceById(id);
            saveData(entity, consultation);
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

    private void saveData(Consultation entity, Consultation consultation) {
        entity.setType(consultation.getType());
        entity.setConsultDate(consultation.getConsultDate());
        entity.setHourInit(consultation.getHourInit());
        setHourEnd(entity, consultation);
        entity.setConsultationValue(consultation.getConsultationValue());
        entity.setClient(consultation.getClient());
        entity.setProfessional(consultation.getProfessional());
    }

    public Map<Long, List<LocalTime>> getAvailableHoursByProfessional(LocalDate date, String type) {
        Specialization specialization = Specialization.CLINICAL;

        if (!type.equals("normal")) {
            specialization = Specialization.SURGEON;
        }

        // Recupera os profissionais com base na especialização (normal ou cirurgia)
        List<Professional> professionals = professionalRepository.searchBySpecialization(specialization);

        // Duração da consulta baseada no tipo
        int durationMinutes = specialization.equals(Specialization.CLINICAL) ? 30 : 60;

        // Gera todos os horários possíveis no dia
        List<LocalTime> allHours = generateAllHours(durationMinutes); // Gera horários baseados na duração

        // Map para armazenar os horários disponíveis por profissional
        Map<Long, List<LocalTime>> availableHoursByProfessional = new HashMap<>();

        // Percorre cada profissional do tipo de consulta
        for (Professional professional : professionals) {
            // Lista para armazenar os horários disponíveis para o profissional atual
            List<LocalTime> availableHours = new ArrayList<>();

            // Recupera as consultas reservadas para o profissional na data selecionada
            List<Consultation> reservedConsultations = repository.searchReservedConsultationsByConsultDateAndProfessional(date, professional.getId());

            // Ordena as consultas reservadas por hora de início
            reservedConsultations.sort(Comparator.comparing(Consultation::getHourInit));

            LocalTime lastHourEnd = LocalTime.of(8, 0);  // Exemplo: o dia começa às 8h

            // Verifica os espaços entre as consultas reservadas
            for (Consultation consultation : reservedConsultations) {
                LocalTime hourInit = consultation.getHourInit();
                LocalTime hourEnd = consultation.getHourEnd();

                // Adiciona horários disponíveis, incluindo o horário de término da consulta anterior
                LocalTime finalLastHourEnd = lastHourEnd;
                availableHours.addAll(allHours.stream()
                        .filter(hour -> (hour.equals(finalLastHourEnd) || hour.isAfter(finalLastHourEnd)) && hour.isBefore(hourInit))
                        .toList());

                lastHourEnd = hourEnd;
            }

            // Adiciona horários disponíveis após a última consulta do dia
            LocalTime finalLastHourEnd1 = lastHourEnd;
            availableHours.addAll(allHours.stream()
                    .filter(hour -> hour.equals(finalLastHourEnd1) || hour.isAfter(finalLastHourEnd1))
                    .toList());

            // Adiciona a lista de horários disponíveis para o profissional no map
            availableHoursByProfessional.put(professional.getId(), availableHours);
        }

        // Retorna o map com os horários disponíveis por profissional
        return availableHoursByProfessional;
    }


    // Método auxiliar para gerar os horários baseados na duração da consulta
    private List<LocalTime> generateAllHours(int durationMinutes) {
        List<LocalTime> hours = new ArrayList<>();
        LocalTime start = LocalTime.of(8, 0); // Exemplo: início do expediente
        LocalTime end = LocalTime.of(18, 0);  // Exemplo: fim do expediente

        while (!start.isAfter(end)) {
            hours.add(start);
            start = start.plusMinutes(durationMinutes);
        }

        return hours;
    }


    private void setHourEnd(Consultation entity, Consultation consultation) {
        if (Objects.equals(consultation.getType(), "normal")) {
            entity.setHourEnd(consultation.getHourInit().plusMinutes(30));
        }
        else {
            entity.setHourEnd(consultation.getHourInit().plusMinutes(60));
        }
    }
}
