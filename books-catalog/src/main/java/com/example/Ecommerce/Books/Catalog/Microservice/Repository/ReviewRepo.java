package com.example.Ecommerce.Books.Catalog.Microservice.Repository;

import com.example.Ecommerce.Books.Catalog.Microservice.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ReviewRepo extends JpaRepository<Review, Long> {
    List<Review> findByBook_Id(Long bookId);
}
