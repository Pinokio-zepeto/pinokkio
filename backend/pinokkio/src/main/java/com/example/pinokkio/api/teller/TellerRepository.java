package com.example.pinokkio.api.teller;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TellerRepository extends JpaRepository<Teller, UUID> {
    Optional<Teller> findByEmail(String email);
}
