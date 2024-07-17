package com.example.pinokkio.api.item;

import com.example.pinokkio.api.item.dto.request.ItemRequest;
import com.example.pinokkio.api.item.dto.response.ItemResponse;
import com.example.pinokkio.api.item.image.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ItemController {

    private final ItemService itemService;
    private final ImageService imageService;

    @PostMapping({"/pos/items"})
    public ResponseEntity<?> makeItem(@Validated @ModelAttribute ItemRequest itemRequest) {
        String imageURL = imageService.uploadImage(itemRequest.getFile());
        Item item =  itemService.createItem(itemRequest, imageURL);
        return new ResponseEntity<>(new ItemResponse(item), HttpStatus.CREATED);
    }

    public ItemController(ItemService itemService, ImageService imageService) {
        this.itemService = itemService;
        this.imageService = imageService;
    }
}
