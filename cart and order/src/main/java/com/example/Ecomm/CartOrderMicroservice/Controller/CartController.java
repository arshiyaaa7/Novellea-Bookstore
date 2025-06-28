package com.example.Ecomm.CartOrderMicroservice.Controller;

import com.example.Ecomm.CartOrderMicroservice.Model.CartItem;
import com.example.Ecomm.CartOrderMicroservice.Service.CartServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartServices cartService;

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItem item) {
        return ResponseEntity.ok(cartService.addItem(item));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getUserCart(userId));
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long id) {
        cartService.removeItem(id);
        return ResponseEntity.ok("Item removed.");
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok("Cart cleared.");
    }

    @PostMapping("/sync")
    public ResponseEntity<String> syncCart(@RequestBody List<CartItem> localItems) {
        cartService.syncCart(localItems);
        return ResponseEntity.ok("Cart synced.");
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getItemCount(@RequestParam Long userId) {
        return ResponseEntity.ok(cartService.getItemCount(userId));
    }
}