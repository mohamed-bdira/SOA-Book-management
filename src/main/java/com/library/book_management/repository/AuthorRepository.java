package com.library.book_management.repository;

import com.library.book_management.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

// Changed Integer to Long to match your database schema
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Author findByName(String name);
}