package com.library.book_management.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.ISBN;

// 1. @Data is on the class
@Data
public class CreateBookRequest {

    // Validation checks for String fields
    @NotBlank(message = "Title is required")
    private String title;

    // 2. Corrected naming convention (camelCase)
    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "ISBN is required")
    @ISBN(type = ISBN.Type.ANY, message = "Invalid ISBN format")
    private String isbn;

    // Validation checks for numeric fields
    @Min(value = 5, message = "Price must be at least 5.0")
    private double price;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    // Validation ensures an Author ID is provided and is not null
    @NotNull(message = "Author ID is required to create a book")
    private Long authorId;

    @NotNull(message = "Publisher Id is required to create a book")
    private Long publisherId;
}