package com.example.BookStore.UsersMicroService.Repo;

import com.example.BookStore.UsersMicroService.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
