package com.example.Ecommerce.Books.Catalog.Microservice.Repository;

import com.example.Ecommerce.Books.Catalog.Microservice.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepo extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByGenreIgnoreCase(String genre);
    List<Book> findByAuthorIgnoreCase(String author);
    List<Book> findByIsbn(String isbn);
    List<Book> findByPublisherIgnoreCase(String publisher);
    List<Book> findAllByOrderByPriceAsc();
    List<Book> findAllByOrderByPriceDesc();
    List<Book> findByPriceBetween(double minPrice, double maxPrice);
    List<Book> findByBestsellerTrue();
    List<Book> findByFeaturedTrue();
    List<Book> findTop4ByOrderByWeeklySalesDesc();
}
