package com.example.Ecomm.CartOrderMicroservice.Service;

import com.example.Ecomm.CartOrderMicroservice.Model.Order;
import com.example.Ecomm.CartOrderMicroservice.Model.OrderItem;
import com.example.Ecomm.CartOrderMicroservice.Model.OrderStatus;
import com.example.Ecomm.CartOrderMicroservice.Repo.OrderRepo;
import com.example.Ecomm.CartOrderMicroservice.Repo.OrderItemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepo orderRepository;
    private final OrderItemRepo orderItemRepository;

    // 1. Create order
    public Order createOrder(Order order) {
        order.setStatus(OrderStatus.PENDING_PAYMENT);
        order.setOrderNumber(generateOrderNumber());
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());

        order.getItems().forEach(item -> item.setOrder(order)); // link items
        return orderRepository.save(order);
    }

    // 2. Get paginated orders
    public Page<Order> getUserOrders(Long userId, Pageable pageable) {
        return orderRepository.findByUserId(userId, pageable);
    }

    // 3. Get a single order
    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    // 4. Update status
    public void updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        order.setUpdatedAt(LocalDateTime.now());
        orderRepository.save(order);
    }

    // 5. Cancel
    public void cancelOrder(Long orderId) {
        updateOrderStatus(orderId, OrderStatus.CANCELLED);
    }

    // 6. Return
    public void returnOrder(Long orderId) {
        updateOrderStatus(orderId, OrderStatus.RETURNED);
    }

    // 7. Track by order ID
    public OrderStatus trackOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .map(Order::getStatus)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // 8. Track by order number
    public Optional<Order> trackByOrderNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber);
    }

    // 9. Reorder
    public Order reorder(Long orderId) {
        Order oldOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Order newOrder = Order.builder()
                .userId(oldOrder.getUserId())
                .orderNumber(generateOrderNumber())
                .subtotal(oldOrder.getSubtotal())
                .shipping(oldOrder.getShipping())
                .tax(oldOrder.getTax())
                .discount(oldOrder.getDiscount())
                .total(oldOrder.getTotal())
                .status(OrderStatus.PENDING_PAYMENT)
                .paymentMethod(oldOrder.getPaymentMethod())
                .paymentStatus("pending")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        List<OrderItem> newItems = oldOrder.getItems().stream()
                .map(item -> OrderItem.builder()
                        .productId(item.getProductId())
                        .title(item.getTitle())
                        .author(item.getAuthor())
                        .isbn(item.getIsbn())
                        .category(item.getCategory())
                        .genre(item.getGenre())
                        .image(item.getImage())
                        .price(item.getPrice())
                        .quantity(item.getQuantity())
                        .order(newOrder)
                        .build())
                .toList();

        newOrder.setItems(newItems);
        return orderRepository.save(newOrder);
    }

    // 10. Generate a unique order number
    private String generateOrderNumber() {
        return "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
