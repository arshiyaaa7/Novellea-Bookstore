package com.example.Ecommerce.InventoryNovellea.Service;

import com.example.Ecommerce.InventoryNovellea.Model.Inventory;
import com.example.Ecommerce.InventoryNovellea.Repo.InventoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepo inventoryRepo;

    // 1. Add or update stock for a product
    @Override
    public Inventory addOrUpdateStock(Long productId, Integer quantity) {
        Inventory inventory = inventoryRepo.findByProductId(productId)
                .orElse(Inventory.builder()
                        .productId(productId)
                        .availableQuantity(0)
                        .build());

        inventory.setAvailableQuantity(inventory.getAvailableQuantity() + quantity);
        inventory.setLastUpdated(LocalDateTime.now());

        return inventoryRepo.save(inventory);
    }

    // 2. Check if enough stock is available
    @Override
    public boolean isInStock(Long productId, int requiredQuantity) {
        return inventoryRepo.findByProductId(productId)
                .map(inv -> inv.getAvailableQuantity() >= requiredQuantity)
                .orElse(false);
    }

    // 3. Reduce stock after order is confirmed
    @Override
    public void reduceStock(Long productId, int quantity) {
        Inventory inventory = inventoryRepo.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Product not found in inventory"));

        if (inventory.getAvailableQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }

        inventory.setAvailableQuantity(inventory.getAvailableQuantity() - quantity);
        inventory.setLastUpdated(LocalDateTime.now());

        inventoryRepo.save(inventory);
    }

    @Override
    public Inventory getStockForProduct(Long productId) {
        return inventoryRepo.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Product not found in inventory"));
    }

    @Override
    public List<Inventory> getAllInventory() {
        return inventoryRepo.findAll();
    }

}