package com.library.book_management.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "TAG")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "o_id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    // Relationship to Book: Many Tags to Many Books (via Book_Tag)
    // We can map this directly using @ManyToMany if we create the Book_Tag class
    @ManyToMany(mappedBy = "tags")
    private Set<Book> books;

    // --- Getters and Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<Book> getBooks() { return books; }
    public void setBooks(Set<Book> books) { this.books = books; }
}