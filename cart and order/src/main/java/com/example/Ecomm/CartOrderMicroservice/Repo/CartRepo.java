package com.example.Ecomm.CartOrderMicroservice.Repo;

import com.example.Ecomm.CartOrderMicroservice.Model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepo extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserId(Long userId);
//    CartItem save(CartItem item);
}
