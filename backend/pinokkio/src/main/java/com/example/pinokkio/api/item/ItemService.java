package com.example.pinokkio.api.item;

import com.example.pinokkio.api.category.Category;
import com.example.pinokkio.api.category.CategoryRepository;
import com.example.pinokkio.api.item.dto.request.ItemRequest;
import com.example.pinokkio.api.item.dto.request.UpdateItemRequest;
import com.example.pinokkio.api.item.image.ImageService;
import com.example.pinokkio.api.pos.Pos;
import com.example.pinokkio.api.pos.PosRepository;
import com.example.pinokkio.common.utils.EntityUtils;
import com.example.pinokkio.exception.domain.category.CategoryNotFoundException;
import com.example.pinokkio.exception.domain.item.ItemNotFoundException;
import com.example.pinokkio.exception.domain.pos.PosNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemService {

    private final ItemRepository itemRepository;
    private final PosRepository posRepository;
    private final CategoryRepository categoryRepository;
    private final ImageService imageService;

    /**
     * 특정 포스의 개별 아이템 조회
     */
    public Item getItem(UUID itemId, UUID posId) {
        validateItem(itemId, posId);
        return itemRepository
                .findById(itemId)
                .orElseThrow(()->new ItemNotFoundException(itemId));
    }

    /**
     * 특정 포스의 전체 아이템 조회
     */
    public List<Item> getGroupItems(UUID posId) {
        return itemRepository.findAllByPosId(posId);
    }

    /**
     * 특정 포스의 특정 카테고리 전체 아이템 조회
     */
    public List<Item> getGroupItemsByCategory(UUID categoryId, UUID posId) {
        return itemRepository.findByCategoryIdAndPosId(categoryId, posId);
    }

    /**
     * 특정 포스의 키워드 접두사 기반 아이템 검색
     */
    public List<Item> getGroupItemsByKeyword(String keyword, UUID posId) {
        return itemRepository.findItemsByKeyWordAndPosId(keyword, posId);
    }

    /**
     * 특정 포스의 아이템 생성
     */
    @Transactional
    public Item createItem(ItemRequest itemRequest, String imageURL) {
        Pos findPos = posRepository
                .findById(UUID.fromString(itemRequest.getPosId()))
                .orElseThrow(()->new PosNotFoundException(itemRequest.getPosId()));
        Category findCategory = categoryRepository.findById(UUID.fromString(itemRequest.getCategoryId()))
                .orElseThrow(() -> new CategoryNotFoundException(itemRequest.getCategoryId()));

        Item item = Item.builder()
                .pos(findPos)
                .category(findCategory)
                .price(itemRequest.getPrice())
                .amount(itemRequest.getAmount())
                .name(itemRequest.getName())
                .detail(itemRequest.getDetail())
                .itemImage(imageURL).build();
        return itemRepository.save(item);
    }

    /**
     * 특정 포스의 아이템 수정
     */
    @Transactional
    public void updateItem(UUID itemId, UUID posId, UpdateItemRequest updateItemRequest, MultipartFile file) {
        Pos pos = EntityUtils.getEntityById(posRepository, posId.toString(), PosNotFoundException::new);
        Item item = EntityUtils.getEntityById(itemRepository, itemId.toString(), ItemNotFoundException::new);
        validateItem(itemId, posId);

        // 기존 이미지 삭제
        if (item.getItemImage() != null) {
            imageService.deleteImage(item.getItemImage());
        }

        // 새 이미지가 있을 경우 업로드
        String imageUrl = null;
        if (file != null && !file.isEmpty()) {
            imageUrl = imageService.uploadImage(file);
        }

        // 아이템 정보 업데이트
        item.updateItemImage(imageUrl); // 새 이미지 URL로 업데이트
        item.updateAmount(updateItemRequest.getAmount());
        item.updatePrice(updateItemRequest.getPrice());
        item.updateName(updateItemRequest.getName());
        item.updateDetail(updateItemRequest.getDetail());
    }

    /**
     * 특정 포스의 아이템 삭제
     */
    @Transactional
    public void deleteItem(UUID itemId, UUID posId) {
        EntityUtils.getEntityById(itemRepository, itemId.toString(), ItemNotFoundException::new);
        validateItem(itemId, posId);
        itemRepository.deleteByItemIdAndPosId(itemId, posId);
    }

    @Transactional
    public void toggleScreenStatus(UUID itemId, UUID posId) {
        Item item = EntityUtils.getEntityById(itemRepository, itemId.toString(), ItemNotFoundException::new);
        validateItem(itemId, posId);
        item.toggleIsScreen();
    }

    @Transactional
    public void toggleSoldOutStatus(UUID itemId, UUID posId) {
        Item item = EntityUtils.getEntityById(itemRepository, itemId.toString(), ItemNotFoundException::new);
        validateItem(itemId, posId);
        item.toggleIsSoldOut();
    }


    /**
     * 해당 아이템이 입력받은 포스의 아이템인지 검증한다.
     * @param itemId 아이템 식별자
     * @param posId 포스 식별자
     */
    public void validateItem(UUID itemId, UUID posId) {
        EntityUtils.getEntityById(posRepository, posId.toString(), PosNotFoundException::new);
        if (!itemRepository.existsByItemIdAndPosId(itemId, posId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "아이템이 해당 포스에 존재하지 않습니다.");
        }
    }

}
