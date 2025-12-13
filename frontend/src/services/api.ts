import axios from 'axios';
import type {BookResponse, CreateAuthorRequest, CreateBookRequest, CreatePublisherRequest} from '../types';

const API_URL = 'http://localhost:8080/api'; // Adjust port if needed

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const BookService = {
    getAll: () => api.get<BookResponse[]>('/books/getAll'),
    save: (data: CreateBookRequest) => api.post('/books/saveBook', data),
    delete: (isbn: string) => api.delete(`/books/deleteBook/${isbn}`),
    updatePrice: (id: number, price: number) => api.put('/books/updateBook', { id: id.toString(), price }),
    getInventory: (category: string) => api.get<number>(`/books/inventory?category=${category}`),
};

export const AuthorService = {
    save: (data: CreateAuthorRequest) => api.post('/author/saveAuthor', data),
};

export const PublisherService = {
    save: (data: CreatePublisherRequest) => api.post('/publisher/savePublisher', data),
};