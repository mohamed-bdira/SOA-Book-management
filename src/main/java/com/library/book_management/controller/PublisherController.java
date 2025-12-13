package com.library.book_management.controller;

import com.library.book_management.dto.CreatePublisherRequest;
import com.library.book_management.model.Publisher;
import com.library.book_management.service.PublisherService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/publisher")
public class PublisherController {
    PublisherService publisherService;
    public PublisherController(PublisherService publisherService) {
        this.publisherService = publisherService;
    }
    @PostMapping("/savePublisher")
    public void savePublisher(@RequestBody CreatePublisherRequest publisherRequest) {

        Publisher publisher = new Publisher();
        publisher.setAddress(publisherRequest.getAddress());
        publisher.setName(publisherRequest.getName());

        publisherService.createPublisher(publisher);


    }
}