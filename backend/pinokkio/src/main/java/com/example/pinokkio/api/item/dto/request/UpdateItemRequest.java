    package com.example.pinokkio.api.item.dto.request;

    import io.swagger.v3.oas.annotations.media.Schema;
    import jakarta.validation.constraints.NotEmpty;
    import jakarta.validation.constraints.Positive;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import org.springframework.web.multipart.MultipartFile;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "아이템 수정 요청 DTO")
    public class UpdateItemRequest {

        @Positive(message = "price는 양수여야 합니다.")
        @Schema(description = "아이템 가격", example = "12000")
        private int price;

        @Positive(message = "amount는 양수여야 합니다.")
        @Schema(description = "아이템 수량", example = "5")
        private int amount;

        @NotEmpty(message = "name은 필수 값입니다.")
        @Schema(description = "아이템 이름", example = "빅맥")
        private String name;

        @NotEmpty(message = "detail은 필수 값입니다.")
        @Schema(description = "아이템 세부 사항", example = "참깨빵 위에 순 쇠고기 패티 두 장 특별한 소스 양상추 치즈 피클 양파까지!")
        private String detail;

    }
