package com.library.book_management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Set;
@Data
@Entity
@Table(name = "BOOK")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "o_id")
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "isbn", nullable = false)
    private String isbn;

    @Column(name = "price")
    private double price;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    // Many-to-One: Foreign Key to Author
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false) // Mapped to the author_id FK column
    private Author author;

    @NotBlank(message = "Category must not be blank")
    @Column(name = "category")
    private String category;
    // Many-to-One: Foreign Key to Publisher
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publisher_id", nullable = false) // Mapped to the publisher_id FK column
    private Publisher publisher;

    // Many-to-Many: Relationship with Tag (mapped via the BOOK_TAG join table)
    // We explicitly define the join table properties here to avoid creating the separate BookTag class if possible.
    // If we rely on the schema's explicit Book_Tag table, we must use the @JoinTable and @JoinColumn.
    @ManyToMany
    @JoinTable(
            name = "BOOK_TAG",
            joinColumns = @JoinColumn(name = "book_id"), // FK in BOOK_TAG referencing BOOK
            inverseJoinColumns = @JoinColumn(name = "tag_id") // FK in BOOK_TAG referencing TAG
    )
    private Set<Tag> tags;


}