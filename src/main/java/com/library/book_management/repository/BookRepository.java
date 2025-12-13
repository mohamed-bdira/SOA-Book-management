package com.library.book_management.repository;

import com.library.book_management.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface BookRepository extends JpaRepository<Book, Long> {

    // 1. Correct: Checks if title exists
    boolean existsByTitle(String title);

    // 2. Correct: Checks if ISBN exists
    boolean existsByIsbn(String isbn);

    // 3. Correct: Checks if a book exists for a specific Author ID
    boolean existsByAuthorId(Long authorId);

    // 4. Transactional is required for derived delete queries
    @Transactional
    void deleteByIsbn(String isbn);

    // 5. Derived count query
    int countByCategory(String category);

    // 6. Custom Update Query
    @Modifying
    @Transactional
    @Query("UPDATE Book b SET b.price = :newPrice WHERE b.id = :bookId")
    int updatePriceById(@Param("bookId") Long id, @Param("newPrice") double price);
}