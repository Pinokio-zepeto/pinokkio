package com.example.pinokkio.api.item;

import com.example.pinokkio.api.category.Category;
import com.example.pinokkio.api.item.dto.request.ItemRequest;
import com.example.pinokkio.exception.notFound.ItemNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemService {

    private final ItemRepository itemRepository;

    public Item getItem(UUID id) {
        return itemRepository.findById(id).orElseThrow(()->new ItemNotFoundException(id));
    }

    public List<Item> getGroupItems() {
        return this.itemRepository.findAll();
    }

    public List<Item> getGroupItemsByCategory(Category category) {
        return this.itemRepository.findByCategory(category);
    }

    public List<Item> getGroupItemsByKeyword(String keyword) {
        return this.itemRepository.findItemsByKeyWord(keyword);
    }

    @Transactional
    public Item createItem(ItemRequest itemRequest, String imageURL) {
        Item item = Item.builder()
                .pos(null)
                .category(null)
                //TODO null 제거하고 로직으로 바꾸기
                .price(itemRequest.getPrice())
                .amount(itemRequest.getAmount())
                .name(itemRequest.getName())
                .detail(itemRequest.getDetail())
                .itemImage(imageURL).build();
        return (Item)this.itemRepository.save(item);
    }

    @Transactional
    public void deleteItem(UUID id) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
        this.itemRepository.delete(item);
    }


}
