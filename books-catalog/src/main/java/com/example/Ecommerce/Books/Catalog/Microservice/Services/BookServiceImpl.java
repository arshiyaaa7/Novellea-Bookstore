package com.example.Ecommerce.Books.Catalog.Microservice.Services;

import com.example.Ecommerce.Books.Catalog.Microservice.Model.Book;
import com.example.Ecommerce.Books.Catalog.Microservice.Model.Review;
import com.example.Ecommerce.Books.Catalog.Microservice.Repository.BookRepo;
import com.example.Ecommerce.Books.Catalog.Microservice.Repository.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookServices {

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private ReviewRepo reviewRepo;

    @Override
    public Book addBook(Book book) {
        return bookRepo.save(book);
    }

    @Override
    public Book updateBook(Book updatedBook, Long id) {
        Book existingBook = bookRepo.findById(id).
                orElseThrow(() -> new RuntimeException("Book not found with id: " + id));

        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setGenre(updatedBook.getGenre());
        existingBook.setIsbn(updatedBook.getIsbn());
        existingBook.setPrice(updatedBook.getPrice());
        existingBook.setDescription(updatedBook.getDescription());
        existingBook.setPublisher(updatedBook.getPublisher());
        existingBook.setImageurl(updatedBook.getImageurl());

        return bookRepo.save(existingBook);
    }

    @Override
    public void deleteBook(Long id) {
        Book book = bookRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
        bookRepo.delete(book);
    }

    @Override
    public Book getBookById(Long id) {
        return bookRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }

    @Override
    public List<Book> searchBookByTitle(String title) {
        return bookRepo.findByTitleContainingIgnoreCase(title);
    }

    @Override
    public List<Book> searchBookByGenre(String genre) {
        return bookRepo.findByGenreIgnoreCase(genre);
    }

    @Override
    public List<Book> searchBookByAuthor(String author) {
        return bookRepo.findByAuthorIgnoreCase(author);
    }

    @Override
    public List<Book> searchBookByIsbn(String isbn) {
        return bookRepo.findByIsbn(isbn);
    }

    @Override
    public List<Book> searchBookByPublisher(String publisher) {
        return bookRepo.findByPublisherIgnoreCase(publisher);
    }

    @Override
    public List<Book> sortByPriceAsc() {
        return bookRepo.findAllByOrderByPriceAsc();
    }

    @Override
    public List<Book> sortByPriceDesc() {
        return bookRepo.findAllByOrderByPriceDesc();
    }

    @Override
    public List<Book> sortByPriceRange(double minPrice, double maxPrice) {
        return bookRepo.findByPriceBetween(minPrice, maxPrice);
    }

    @Override
    public Review addReviewToBook(Long bookId, Review review) {
        Book book = bookRepo.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        review.setBook(book);
        return reviewRepo.save(review);
    }

    @Override
    public List<Review> getReviewsByBookId(Long bookId) {
        return reviewRepo.findByBook_Id(bookId);
    }

    @Override
    public List<Book> getBestsellers() {
        return bookRepo.findByBestsellerTrue();
    }

    @Override
    public List<Book> getFeaturedBooks() {
        return bookRepo.findByFeaturedTrue();
    }

    @Override
    public List<Book> getPopularThisWeek() {
        return bookRepo.findTop4ByOrderByWeeklySalesDesc();
    }

}
