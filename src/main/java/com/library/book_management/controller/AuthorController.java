package com.library.book_management.controller;

import com.library.book_management.dto.CreateAuthorRequest;
import com.library.book_management.model.Author;
import com.library.book_management.service.AuthorService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/author")
public class AuthorController {
    private AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }
    @PostMapping("/saveAuthor")
    public Author saveAuthor(@RequestBody CreateAuthorRequest authorRequest){
        Author author = new Author();
        author.setName(authorRequest.getName());
        author.setEmail(authorRequest.getEmail());
        Author savedAuthor =authorService.saveAuthor(author);
        return savedAuthor;

    }
}