package com.library.book_management.dto;

import lombok.Data;

@Data
public class BookResponse {
    private Long id;
    private String title;
    private String category;
    private String isbn;
    private double price;
    private int quantity;

    // Simplified relationship data
    private Long authorId;
    private String authorName;
    private Long publisherId;
    private String publisherName;
}