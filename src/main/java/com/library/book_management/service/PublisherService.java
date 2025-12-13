package com.library.book_management.service;

import com.library.book_management.model.Publisher;
import com.library.book_management.repository.PublisherRepository;
import org.springframework.stereotype.Service;


@Service
public class PublisherService {
    PublisherRepository publisherRepository;
    public PublisherService(PublisherRepository publisherRepository) {
        this.publisherRepository = publisherRepository;
    }

    public void createPublisher (Publisher publisher) {
        publisherRepository.save(publisher);
    }
}