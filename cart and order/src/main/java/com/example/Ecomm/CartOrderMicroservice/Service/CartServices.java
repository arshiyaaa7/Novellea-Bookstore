package com.example.Ecomm.CartOrderMicroservice.Service;

import com.example.Ecomm.CartOrderMicroservice.Model.CartItem;
import com.example.Ecomm.CartOrderMicroservice.Repo.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartServices {

    private final CartRepo cartrepo;
    //constructor injection for CartRepo
    public CartServices(CartRepo cartrepo) {
        this.cartrepo = cartrepo;
    }

    public CartItem addItem(CartItem item) {
        return cartrepo.save(item);
    }

    public List<CartItem> getUserCart(Long userId) {
        return cartrepo.findByUserId(userId);
    }

    public void removeItem(Long id) {
        cartrepo.deleteById(id);
    }

    public void clearCart(Long userId) {
        List<CartItem> items = cartrepo.findByUserId(userId);
        cartrepo.deleteAll(items);
    }

    // Update the quantity or product of a cart item
    public CartItem updateItem(Long id, CartItem updatedItem) {
        Optional<CartItem> existing = cartrepo.findById(id);
        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(updatedItem.getQuantity());
            item.setBookId(updatedItem.getBookId());
            return cartrepo.save(item);
        } else {
            throw new RuntimeException("Cart item not found");
        }
    }

    // Sync: Clear and replace cart items with a client-provided list
    public void syncCart(List<CartItem> localItems) {
        if (localItems.isEmpty()) return;

        Long userId = localItems.getFirst().getUserId();
        clearCart(userId);
        cartrepo.saveAll(localItems);
    }

    // Count the number of items in a cart for a user
    public int getItemCount(Long userId) {
        return cartrepo.findByUserId(userId).size();
    }

}
