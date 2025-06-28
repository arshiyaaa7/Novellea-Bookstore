package com.example.Ecommerce.InventoryNovellea.Controller;

import com.example.Ecommerce.InventoryNovellea.Model.Inventory;
import com.example.Ecommerce.InventoryNovellea.Service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    // 1. Add or update stock
    @PostMapping("/update")
    public ResponseEntity<Inventory> updateStock(@RequestParam Long productId, @RequestParam Integer quantity) {
        return ResponseEntity.ok(inventoryService.addOrUpdateStock(productId, quantity));
    }

    // 2. Check stock availability
    @GetMapping("/check")
    public ResponseEntity<Boolean> isAvailable(@RequestParam Long productId, @RequestParam Integer quantity) {
        return ResponseEntity.ok(inventoryService.isInStock(productId, quantity));
    }

    // 3. Reduce stock (e.g., after order is placed)
    @PostMapping("/reduce")
    public ResponseEntity<String> reduceStock(@RequestParam Long productId, @RequestParam Integer quantity) {
        inventoryService.reduceStock(productId, quantity);
        return ResponseEntity.ok("Stock reduced");
    }

    // 4. Get stock info for a product
    @GetMapping("/{productId}")
    public ResponseEntity<Inventory> getStock(@PathVariable Long productId) {
        return ResponseEntity.ok(
                inventoryService.getStockForProduct(productId)
        );
    }

    // 5. Get stock info for all products (optional)
    @GetMapping
    public ResponseEntity<List<Inventory>> getAllStock() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }
}
