package com.example.BookStore.UsersMicroService.Services;

import com.example.BookStore.UsersMicroService.Model.User;
import java.util.List;

public interface UserService {
    User saveUser(User user);
    // List<User> getAllUsers(); // Optional admin endpoint

    User getUserById(Long id);
    User getUserByEmail(String email);

    User getUserProfile(String email);
    User updateUserProfile(String email, User updatedUser);

    // Wishlist support
    List<String> getWishlistByUserId(Long id);
    List<String> updateWishlist(Long id, List<String> wishlist);

//    List<User> getAllUsers();
}
