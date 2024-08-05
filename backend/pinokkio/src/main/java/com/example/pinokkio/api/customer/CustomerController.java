package com.example.pinokkio.api.customer;

import com.example.pinokkio.api.customer.dto.request.CustomerRegistrationEvent;
import com.example.pinokkio.api.customer.dto.request.CustomerRegistrationRequest;
import com.example.pinokkio.api.customer.sse.SSEService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
@Slf4j
public class CustomerController {

    private final CustomerService customerService;
    private final SSEService sseService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody CustomerRegistrationRequest request) {
        try {
            Customer newCustomer = customerService.saveCustomer(request.getCustomer(), request.getFaceEmbeddingData());
            return ResponseEntity.ok(newCustomer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error registering customer: " + e.getMessage());
        }
    }

    @GetMapping("/face-recognition-events")
    public SseEmitter subscribeToEvents() {
        return sseService.createEmitter();
    }

    // CustomerRegistrationEvent를 처리하는 이벤트 리스너 메서드입니다.
    @EventListener
    public void handleCustomerRegistrationEvent(CustomerRegistrationEvent event) {
        // 이벤트에 포함된 요청 정보로 고객 등록을 수행합니다.
        register(event.getRequest());
    }
}
