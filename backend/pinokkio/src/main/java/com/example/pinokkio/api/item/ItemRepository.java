package com.example.pinokkio.api.item;

import com.example.pinokkio.api.category.Category;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    List<Item> findByCategory(Category category);

    @Query("SELECT i FROM Item i WHERE i.name LIKE :keyword%")
    List<Item> findItemsByKeyWord(String keyword);
}
