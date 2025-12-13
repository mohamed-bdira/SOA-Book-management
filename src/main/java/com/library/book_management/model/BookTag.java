package com.library.book_management.model;

import jakarta.persistence.*;

@Entity
@Table(name = "BOOK_TAG")
public class BookTag {

    @EmbeddedId
    private BookTagId id;

    // Many-to-One relationship for the Book side of the composite key
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("bookId") // Maps the 'bookId' property in BookTagId
    @JoinColumn(name = "book_id")
    private Book book;

    // Many-to-One relationship for the Tag side of the composite key
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("tagId") // Maps the 'tagId' property in BookTagId
    @JoinColumn(name = "tag_id")
    private Tag tag;

    // --- Constructors, Getters, and Setters ---

    public BookTag() {}

    public BookTag(Book book, Tag tag) {
        this.book = book;
        this.tag = tag;
        this.id = new BookTagId(book.getId(), tag.getId());
    }

    public BookTagId getId() { return id; }
    public void setId(BookTagId id) { this.id = id; }

    public Book getBook() { return book; }
    public void setBook(Book book) { this.book = book; }

    public Tag getTag() { return tag; }
    public void setTag(Tag tag) { this.tag = tag; }
}