package com.example.Ecommerce.Books.Catalog.Microservice.Services;

import com.example.Ecommerce.Books.Catalog.Microservice.Model.Book;
import com.example.Ecommerce.Books.Catalog.Microservice.Model.Review;

import java.util.List;

public interface BookServices {
    Book addBook(Book book);
    Book updateBook(Book book, Long id);
    void deleteBook(Long id);
    Book getBookById(Long id);
    List<Book> getAllBooks();
    List<Book> searchBookByTitle(String title);
    List<Book> searchBookByGenre(String genre);
    List<Book> searchBookByAuthor(String author);
    List<Book> searchBookByIsbn(String isbn);
    List<Book> searchBookByPublisher(String publisher);
    List<Book> sortByPriceAsc();
    List<Book> sortByPriceDesc();
    List<Book> sortByPriceRange(double minPrice, double maxPrice);
    Review addReviewToBook(Long bookId, Review review);
    List<Review> getReviewsByBookId(Long bookId);
}
