package com.example.BookStore.UsersMicroService.Controller;

import com.example.BookStore.UsersMicroService.Model.User;
import com.example.BookStore.UsersMicroService.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);

        Map<String, Object> response = new HashMap<>();
        response.put("user", savedUser);
        response.put("token", generateMockToken(savedUser));
        response.put("refreshToken", generateMockRefreshToken(savedUser));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        User user = userService.getUserByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("token", generateMockToken(user));
            response.put("refreshToken", generateMockRefreshToken(user));
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }


//    @PostMapping("/register")
//    public ResponseEntity<User> createUser(@RequestBody User user){
//        return ResponseEntity.ok(userService.saveUser(user));
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
//        String email = credentials.get("email");
//        String password = credentials.get("password");
//
//        User user = userService.getUserByEmail(email);
//        if (user != null && user.getPassword().equals(password)) {
//            return ResponseEntity.ok(user);
//        } else {
//            return ResponseEntity.status(401).body("Invalid email or password");
//        }
//    }

//    @GetMapping
//    public ResponseEntity<List<User>> getAllUsers(){
//        return ResponseEntity.ok(userService.getAllUsers());
//    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/profile/{email}")
    public ResponseEntity<User> getProfile(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserProfile(email));
    }

    @PutMapping("/profile/{email}")
    public ResponseEntity<User> updateProfile(@PathVariable String email, @RequestBody User updatedUser) {
        return ResponseEntity.ok(userService.updateUserProfile(email, updatedUser));
    }

    @GetMapping("/wishlist/{id}")
    public ResponseEntity<List<String>> getWishlist(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getWishlistByUserId(id));
    }

    @PostMapping("/wishlist/{id}")
    public ResponseEntity<List<String>> updateWishlist(@PathVariable Long id, @RequestBody List<String> wishlist) {
        return ResponseEntity.ok(userService.updateWishlist(id, wishlist));
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<String> getOrderHistoryPlaceholder(@PathVariable Long id) {
        return ResponseEntity.ok("Order history will be handled by Order Microservice");
    }

    private String generateMockToken(User user) {
        return "mock-jwt-token-" + user.getId() + "-" + System.currentTimeMillis();
    }

    private String generateMockRefreshToken(User user) {
        return "mock-refresh-token-" + user.getId() + "-" + System.currentTimeMillis();
    }

}
