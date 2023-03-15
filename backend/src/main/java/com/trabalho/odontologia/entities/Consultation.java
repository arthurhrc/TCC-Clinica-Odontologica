package com.trabalho.odontologia.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

@Entity
@Table(name = "tb_consultation")
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private LocalDate consultDate;
    private LocalTime hourInit;
    private LocalTime hourEnd;
    private double consultationValue;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "professional_id")
    private Professional professional;

    public Consultation() {
    }

    public Consultation(Long id, String type, LocalDate consultDate, LocalTime hourInit, LocalTime hourEnd, double consultationValue, Client client, Professional professional) {
        this.id = id;
        this.type = type;
        this.consultDate = consultDate;
        this.hourInit = hourInit;
        this.hourEnd = hourEnd;
        this.consultationValue = consultationValue;
        this.client = client;
        this.professional = professional;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getConsultDate() {
        return consultDate;
    }

    public void setConsultDate(LocalDate consultDate) {
        this.consultDate = consultDate;
    }

    public LocalTime getHourInit() {
        return hourInit;
    }

    public void setHourInit(LocalTime hourInit) {
        this.hourInit = hourInit;
    }

    public LocalTime getHourEnd() {
        return hourEnd;
    }

    public void setHourEnd(LocalTime hourEnd) {
        this.hourEnd = hourEnd;
    }

    public double getConsultationValue() {
        return consultationValue;
    }

    public void setConsultationValue(double consultationValue) {
        this.consultationValue = consultationValue;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Professional getProfessional() {
        return professional;
    }

    public void setProfessional(Professional professional) {
        this.professional = professional;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Consultation that = (Consultation) o;

        return Objects.equals(type, that.type);
    }

    @Override
    public int hashCode() {
        return type != null ? type.hashCode() : 0;
    }
}
