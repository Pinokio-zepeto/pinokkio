package com.example.pinokkio.api.kiosk;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface KioskRepository extends JpaRepository<Kiosk, UUID> {
    Optional<Kiosk> findByEmail(String email);
}
