package com.example.pinokkio.api.item.dto.request;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@AllArgsConstructor
public class ItemRequest {

    private UUID posId;
    private UUID categoryId;
    private int price;
    private int amount;
    private String name;
    private String detail;
    //nullable
    private MultipartFile file;

}
