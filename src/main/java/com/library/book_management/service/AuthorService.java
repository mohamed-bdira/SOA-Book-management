package com.library.book_management.service;

import com.library.book_management.model.Author;
import com.library.book_management.repository.AuthorRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        // FIXED: Added 'this.' to correctly assign the field
        this.authorRepository = authorRepository;
    }

    public Author findAuthorByName(String name) {
        return authorRepository.findByName(name);
    }

    public Author saveAuthor(Author author) {
        return authorRepository.save(author);
    }
}