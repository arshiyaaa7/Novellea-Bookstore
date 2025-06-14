package com.example.Ecommerce.Books.Catalog.Microservice.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Entity
@Getter
@Setter
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String genre;

    @Column(unique = true, nullable = false)
    private String isbn;

    private double price;
    private String description;
    private String publisher;
    private String imageurl;
    private String language;
    private int pages;
    private String publicationYear;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id") // foreign key in Review table
    private List<Review> reviews = new ArrayList<>();

}
