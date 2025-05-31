package com.example.BookStore.UsersMicroService.Services;

import com.example.BookStore.UsersMicroService.Model.User;
import com.example.BookStore.UsersMicroService.Repo.UserRepo;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;

    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public User saveUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

//    @Override
//    public List<User> getAllUsers() {
//        return userRepo.findAll();
//    }

    @Override
    public User getUserById(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public User getUserProfile(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public User updateUserProfile(String email, User updatedUser) {
        User existingUser = userRepo.findByEmail(email);
        if (existingUser != null) {
            if (updatedUser.getName() != null) {
                existingUser.setName(updatedUser.getName());
            }
            if (updatedUser.getAddress() != null) {
                existingUser.setAddress(updatedUser.getAddress());
            }
            if(updatedUser.getEmail() != null) {
                existingUser.setEmail(updatedUser.getEmail());
            }
            if(updatedUser.getPassword() != null) {
                existingUser.setPassword(updatedUser.getPassword());
            }
            if (updatedUser.getPhone() != null) {
                existingUser.setPhone(updatedUser.getPhone());
            }
            if (updatedUser.getWishlist() != null) {
                existingUser.setWishlist(updatedUser.getWishlist());
            }
            return userRepo.save(existingUser);
        }
        throw new RuntimeException("User not found with email: " + email);
    }

    @Override
    public List<String> getWishlistByUserId(Long id) {
        User user = userRepo.findById(id).orElse(null);
        return (user != null) ? user.getWishlist() : new ArrayList<>();
    }

    @Override
    public List<String> updateWishlist(Long id, List<String> wishlist) {
        User user = userRepo.findById(id).orElse(null);
        if (user != null) {
            user.setWishlist(wishlist);
            userRepo.save(user);
            return user.getWishlist();
        }
        return new ArrayList<>();
    }
}