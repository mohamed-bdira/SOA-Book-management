package com.library.book_management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateAuthorRequest {
    @NotBlank(message = "Author name is required")
    @Size(max = 100, message = "Author name cannot exceed 100 characters ")
    private String name ;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format ")
    private String email;


}