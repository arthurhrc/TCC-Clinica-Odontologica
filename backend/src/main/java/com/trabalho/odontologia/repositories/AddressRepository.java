package com.trabalho.odontologia.repositories;

import com.trabalho.odontologia.entities.Address;
import com.trabalho.odontologia.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
