package com.library.book_management.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class BookTagId implements Serializable {

    private Long bookId;
    private Long tagId;

    // --- Constructors, Getters, Setters, hashCode, equals ---

    public BookTagId() {}
    public BookTagId(Long bookId, Long tagId) {
        this.bookId = bookId;
        this.tagId = tagId;
    }

    public Long getBookId() { return bookId; }
    public void setBookId(Long bookId) { this.bookId = bookId; }

    public Long getTagId() { return tagId; }
    public void setTagId(Long tagId) { this.tagId = tagId; }

    // IMPORTANT: Equals and hashCode must be implemented for composite keys!
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookTagId bookTagId = (BookTagId) o;
        return Objects.equals(bookId, bookTagId.bookId) && Objects.equals(tagId, bookTagId.tagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookId, tagId);
    }
}