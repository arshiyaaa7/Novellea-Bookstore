package com.example.Ecommerce.Books.Catalog.Microservice.Controller;

import com.example.Ecommerce.Books.Catalog.Microservice.Model.Book;
import com.example.Ecommerce.Books.Catalog.Microservice.Model.Review;
import com.example.Ecommerce.Books.Catalog.Microservice.Services.BookServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookServices bookServices;

    //1. Add a new book
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        return ResponseEntity.ok(bookServices.addBook(book));
    }

    //2. Update an existing book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@RequestBody Book book, @PathVariable Long id) {
        return ResponseEntity.ok(bookServices.updateBook(book,id));
    }

    //3. Delete a book
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        bookServices.deleteBook(id);
        return ResponseEntity.ok("Book deleted successfully");
    }

    //4. Get a book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookServices.getBookById(id);
        if (book != null) {
            return ResponseEntity.ok(book);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookServices.getAllBooks());
    }

    //6. Search books by title
    @GetMapping("/search/title")
    public ResponseEntity<List<Book>> searchBookByTitle(@RequestParam String title) {
        return ResponseEntity.ok(bookServices.searchBookByTitle(title));
    }

    //7. Search books by genre
    @GetMapping("/search/genre")
    public ResponseEntity<List<Book>> searchBookByGenre(@RequestParam String genre) {
        return ResponseEntity.ok(bookServices.searchBookByGenre(genre));
    }

    //8. Search books by author
    @GetMapping("/search/author")
    public ResponseEntity<List<Book>> searchBookByAuthor(@RequestParam String author) {
        return ResponseEntity.ok(bookServices.searchBookByAuthor(author));
    }

    //9. Search books by ISBN
    @GetMapping("/search/isbn")
    public ResponseEntity<Book> searchBookByIsbn(@RequestParam String isbn) {
        List<Book> books = bookServices.searchBookByIsbn(isbn);
        if (books.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(books.getFirst()); // Assuming ISBN is unique
        }
    }

    //10. Get books by publisher
    @GetMapping("/search/publisher")
    public ResponseEntity<List<Book>> searchBookByPublisher(@RequestParam String publisher) {
        return ResponseEntity.ok(bookServices.searchBookByPublisher(publisher));
    }

    //11. Sort books by price(low to high)
    @GetMapping("/sort/price/asc")
    public ResponseEntity<List<Book>> getBooksSortedByPriceAsc() {
        return ResponseEntity.ok(bookServices.sortByPriceAsc());
    }

    //12. Sort books by price(high to low)
    @GetMapping("/sort/price/desc")
    public ResponseEntity<List<Book>> getBooksSortedByPriceDesc() {
        return ResponseEntity.ok(bookServices.sortByPriceDesc());
    }

    //13. Get books in a specific price range
    @GetMapping("/search/price")
    public ResponseEntity<List<Book>> getBooksInPriceRange(
            @RequestParam double minPrice,
            @RequestParam double maxPrice) {
        return ResponseEntity.ok(bookServices.sortByPriceRange(minPrice, maxPrice));
    }

    @PostMapping("/{bookId}/reviews")
    public ResponseEntity<Review> addReview(@PathVariable Long bookId, @RequestBody Review review) {
        return ResponseEntity.ok(bookServices.addReviewToBook(bookId, review));
    }

    @GetMapping("/{bookId}/reviews")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long bookId) {
        return ResponseEntity.ok(bookServices.getReviewsByBookId(bookId));
    }

    @GetMapping("/bestsellers")
    public ResponseEntity<List<Book>> getBestsellers() {
        return ResponseEntity.ok(bookServices.getBestsellers());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Book>> getFeaturedBooks() {
        return ResponseEntity.ok(bookServices.getFeaturedBooks());
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Book>> getPopularBooks() {
        return ResponseEntity.ok(bookServices.getPopularThisWeek());
    }
}
