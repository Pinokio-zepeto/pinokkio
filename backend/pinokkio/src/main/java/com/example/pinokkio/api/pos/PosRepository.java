package com.example.pinokkio.api.pos;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PosRepository extends JpaRepository<Pos, UUID> {
    Optional<Pos> findByEmail(String email);
}
