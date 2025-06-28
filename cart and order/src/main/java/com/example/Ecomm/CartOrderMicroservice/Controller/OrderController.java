package com.example.Ecomm.CartOrderMicroservice.Controller;

import com.example.Ecomm.CartOrderMicroservice.Model.Order;
import com.example.Ecomm.CartOrderMicroservice.Model.OrderStatus;
import com.example.Ecomm.CartOrderMicroservice.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // 1. Create an order from a cart
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.createOrder(order));
    }

    // 2. Get user's orders (paginated)
    @GetMapping
    public ResponseEntity<Page<Order>> getUserOrders(
            @RequestParam Long userId,
            @RequestParam int page,
            @RequestParam int size
    ) {
        return ResponseEntity.ok(orderService.getUserOrders(userId, PageRequest.of(page, size)));
    }

    // 3. Get a specific order
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 4. Update order status
    @PutMapping("/{orderId}/status")
    public ResponseEntity<String> updateStatus(
            @PathVariable Long orderId,
            @RequestParam OrderStatus status
    ) {
        orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok("Order status updated");
    }

    // 5. Cancel order
    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok("Order cancelled");
    }

    // 6. Return order
    @PostMapping("/{orderId}/return")
    public ResponseEntity<String> returnOrder(@PathVariable Long orderId) {
        orderService.returnOrder(orderId);
        return ResponseEntity.ok("Order returned");
    }

    // 7. Track order by orderId
    @GetMapping("/{orderId}/track")
    public ResponseEntity<OrderStatus> trackOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.trackOrder(orderId));
    }

    // 8. Track order by orderNumber
    @GetMapping("/track/{orderNumber}")
    public ResponseEntity<Order> trackByOrderNumber(@PathVariable String orderNumber) {
        return orderService.trackByOrderNumber(orderNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 9. Download invoice (mocked for now)
    @GetMapping("/{orderId}/invoice")
    public ResponseEntity<String> downloadInvoice(@PathVariable Long orderId) {
        return ResponseEntity.ok("Invoice download not implemented yet");
    }

    // 10. Reorder
    @PostMapping("/{orderId}/reorder")
    public ResponseEntity<Order> reorder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.reorder(orderId));
    }
}

