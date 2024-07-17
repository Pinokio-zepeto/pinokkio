package com.example.pinokkio.api.category.dto.response;

import com.example.pinokkio.api.category.Category;
import lombok.Getter;

import java.util.UUID;

@Getter
public class CategoryResponse {
    private final UUID id;
    private final String name;

    public CategoryResponse(Category category) {
        this.id = category.getId();
        this.name = category.getName();
    }
}
