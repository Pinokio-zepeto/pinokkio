package com.example.pinokkio.api.auth.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
public class SignUpKioskRequest {
    private String posId;
}
