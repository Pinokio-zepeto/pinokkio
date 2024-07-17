package com.example.pinokkio.api.category;


import com.example.pinokkio.exception.notFound.CategoryNotFoundException;
import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getGroupCategories() {
        return this.categoryRepository.findAll();
    }

    @Transactional
    public Category createCategory(String categoryName) {
        Category category = Category.builder().name(categoryName).build();
        return (Category)this.categoryRepository.save(category);
    }

    @Transactional
    public void deleteCategory(UUID id) {
        Category category = (Category) this.categoryRepository.findById(id).orElseThrow(() -> {
            return new CategoryNotFoundException(id);
        });
        this.categoryRepository.delete(category);
    }

}