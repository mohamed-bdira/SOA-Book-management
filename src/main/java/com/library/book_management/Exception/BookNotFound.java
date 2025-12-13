package com.library.book_management.Exception;

public class BookNotFound  extends RuntimeException{
    public BookNotFound(String category){
        super("Book with categorty: " + category + " not found");
    }
}