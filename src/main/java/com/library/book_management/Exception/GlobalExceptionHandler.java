package com.library.book_management.Exception;

import com.library.book_management.Exception.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

// This annotation tells Spring that this class will handle exceptions
// thrown by all controllers (global level).
@RestControllerAdvice
public class GlobalExceptionHandler {

    // This method runs automatically when a @Valid validation error occurs.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationErrors(MethodArgumentNotValidException ex) {
        // This map will store fieldName -> errorMessage
        Map<String, String> validationErrors = new HashMap<>();

        // Loop through all validation errors and extract the field name and message
        ex.getBindingResult().getFieldErrors().forEach(error ->
                validationErrors.put(error.getField(), error.getDefaultMessage())
        );

        // Create an ApiError object
        ApiError apiError = new ApiError(
                "Validation failed",
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                validationErrors
        );

        // Return HTTP 400 (Bad Request) with our custom ApiError object
        return ResponseEntity.badRequest().body(apiError);
    }

    // This method handles ANY RuntimeException thrown in your backend (e.g., BookNotFoundException).
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiError> handleRuntime(RuntimeException ex) {
        // Create a simple ApiError without field-level validation errors
        ApiError apiError = new ApiError(
                ex.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                null // No field-specific errors map needed for generic runtime errors
        );

        // Return the error response
        return ResponseEntity.badRequest().body(apiError);
    }
}