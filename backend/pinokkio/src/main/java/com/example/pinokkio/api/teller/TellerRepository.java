package com.example.pinokkio.api.teller;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface TellerRepository extends JpaRepository<Teller, UUID> {
}
