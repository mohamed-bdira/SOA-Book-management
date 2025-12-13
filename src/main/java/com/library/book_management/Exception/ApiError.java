package com.library.book_management.Exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@AllArgsConstructor
public class ApiError extends Exception{
    private String message;
    private int status;
    private LocalDateTime timestamp;
    private Map<String, String> errors;
}