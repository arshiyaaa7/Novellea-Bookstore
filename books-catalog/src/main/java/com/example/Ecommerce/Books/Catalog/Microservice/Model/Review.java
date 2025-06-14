package com.example.Ecommerce.Books.Catalog.Microservice.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String reviewerName;
    private String comment;
    private int rating; // Assuming rating is an integer value (e.g., 1 to 5)

    @ManyToOne
    @JoinColumn(name = "book_id" , nullable = false)
    @JsonIgnore
    private Book book;
}
