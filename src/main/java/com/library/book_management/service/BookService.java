package com.library.book_management.service;

import com.library.book_management.dto.BookResponse;
import com.library.book_management.dto.CreateBookRequest;
import com.library.book_management.model.Author;
import com.library.book_management.model.Book;
import com.library.book_management.model.Publisher;
import com.library.book_management.repository.AuthorRepository;
import com.library.book_management.repository.BookRepository;
import com.library.book_management.repository.PublisherRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookService {
    // Inside BookService.java

    // New helper method to map a single Book entity to a DTO
    private BookResponse mapToResponseDto(Book book) {
        BookResponse dto = new BookResponse();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setCategory(book.getCategory());
        dto.setIsbn(book.getIsbn());
        dto.setPrice(book.getPrice());
        dto.setQuantity(book.getQuantity());

        // Break the loop by only mapping simple fields from related entities
        if (book.getAuthor() != null) {
            dto.setAuthorId(book.getAuthor().getId());
            dto.setAuthorName(book.getAuthor().getName());
        }
        if (book.getPublisher() != null) {
            dto.setPublisherId(book.getPublisher().getId());
            dto.setPublisherName(book.getPublisher().getName());
        }
        return dto;
    }

    // Update your getAllBooks method
    public List<BookResponse> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        // Map the List of Entities to a List of DTOs
        return books.stream()
                .map(this::mapToResponseDto)
                .collect(java.util.stream.Collectors.toList());
    }

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final PublisherRepository publisherRepository;

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository, PublisherRepository publisherRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.publisherRepository = publisherRepository;
    }

    @Transactional // Good practice for write operations
    public void saveBook(CreateBookRequest book) {
        if (bookRepository.existsByTitle(book.getTitle())) {
            System.out.println("Title already exists");
            return;
        }

        // FIXED: Removed Math.toIntExact now that Repository uses Long
        Author author = authorRepository.findById(book.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found"));

        Publisher publisher = publisherRepository.findById(book.getPublisherId())
                .orElseThrow(() -> new RuntimeException("Publisher not found"));

        Book bookEntity = new Book();
        bookEntity.setTitle(book.getTitle());
        bookEntity.setCategory(book.getCategory());
        bookEntity.setIsbn(book.getIsbn());
        bookEntity.setPrice(book.getPrice());
        bookEntity.setQuantity(book.getQuantity());
        bookEntity.setAuthor(author);
        bookEntity.setPublisher(publisher);

        bookRepository.save(bookEntity);
    }

    public int inventory(String category) {
        return bookRepository.countByCategory(category);
    }

    @Transactional // Required because updatePriceById is a custom modification
    public void updatePrice(Long id, double price) {
        bookRepository.updatePriceById(id, price);
        // FIXED: Removed bookRepository.saveAll(bookRepository.findAll());
        // That line was unnecessary and very slow.
    }

    @Transactional // Required for deleteByIsbn
    public void deleteBook(String isbn) {
        bookRepository.deleteByIsbn(isbn);
    }


}