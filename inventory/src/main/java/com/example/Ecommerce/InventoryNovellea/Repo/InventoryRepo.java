package com.example.Ecommerce.InventoryNovellea.Repo;

import com.example.Ecommerce.InventoryNovellea.Model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InventoryRepo extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByProductId(Long productId);
}

