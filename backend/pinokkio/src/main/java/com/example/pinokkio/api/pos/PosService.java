package com.example.pinokkio.api.pos;

import com.example.pinokkio.api.pos.dto.response.PosResponse;
import com.example.pinokkio.exception.notFound.PosEmailNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class PosService {

    private final PosRepository posRepository;

    public PosResponse getMyPosInfo(String email) {
        Pos pos = posRepository
                .findByEmail(email)
                .orElseThrow(() -> new PosEmailNotFoundException(email));
        return new PosResponse(pos.getCode().getName(), pos.getId().toString(), pos.getEmail());
    }



}
