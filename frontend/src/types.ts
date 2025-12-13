export interface BookResponse {
    id: number;
    title: string;
    category: string;
    isbn: string;
    price: number;
    quantity: number;
    authorId: number;
    authorName: string;
    publisherId: number;
    publisherName: string;
}

export interface CreateBookRequest {
    title: string;
    category: string;
    isbn: string;
    price: number;
    quantity: number;
    authorId: number;
    publisherId: number;
}

export interface CreateAuthorRequest {
    name: string;
    email: string;
}

export interface CreatePublisherRequest {
    name: string;
    address: string;
}

export interface ApiError {
    message: string;
    status: number;
    timestamp: string;
    errors?: Record<string, string>; // Maps field names to error messages
}