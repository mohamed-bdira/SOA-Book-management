package com.library.book_management.dto;

import lombok.Data;

@Data
public class UpdateBookRequest {
    private String id;
    private Double price;


}