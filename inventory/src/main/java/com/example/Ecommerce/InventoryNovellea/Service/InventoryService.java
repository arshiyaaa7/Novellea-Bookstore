package com.example.Ecommerce.InventoryNovellea.Service;

import com.example.Ecommerce.InventoryNovellea.Model.Inventory;

import java.util.List;

public interface InventoryService {
    Inventory addOrUpdateStock(Long productId, Integer quantity);
    boolean isInStock(Long productId, int requiredQuantity);
    void reduceStock(Long productId, int quantity);
    Inventory getStockForProduct(Long productId);
    List<Inventory> getAllInventory();

}

