package com.example.BookStore.UsersMicroService.Model;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column
    private String email;

    private String password;

    private String address;

    @Getter
    @Setter
    private String phone;

    @ElementCollection
    @Getter
    @Setter
    private List<String> wishlist = new ArrayList<>();
    //@ElementCollection makes JPA create a secondary table
    // user_wishlist with a user_id → book_name mapping.
}
