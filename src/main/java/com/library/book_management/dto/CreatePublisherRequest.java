package com.library.book_management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreatePublisherRequest {


    @NotBlank(message = "Author name is required")
    @Size(max = 100, message = "Publisher name cannot exceed 100 characters ")
    private String name ;

    @NotBlank(message = "Address is required")
    private String address;



}