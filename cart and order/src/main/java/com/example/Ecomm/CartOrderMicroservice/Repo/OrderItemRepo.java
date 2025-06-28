package com.example.Ecomm.CartOrderMicroservice.Repo;

import com.example.Ecomm.CartOrderMicroservice.Model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {
}

