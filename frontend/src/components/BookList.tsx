import { useEffect, useState } from 'react';
import { BookService } from '../services/api';
import type {BookResponse} from '../types';
import { Trash2, Edit2, Package } from 'lucide-react';
import { toast } from 'react-toastify';

export default function BookList({ refreshTrigger }: { refreshTrigger: number }) {
    const [books, setBooks] = useState<BookResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBooks();
    }, [refreshTrigger]);

    const loadBooks = async () => {
        setLoading(true);
        try {
            const response = await BookService.getAll();
            setBooks(response.data);
        } catch (error) {
            toast.error("Could not load inventory");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (isbn: string) => {
        if(!confirm("Are you sure you want to remove this book from inventory?")) return;
        try {
            await BookService.delete(isbn);
            toast.success("Book deleted successfully");
            loadBooks();
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    const handleUpdatePrice = async (id: number) => {
        const newPrice = prompt("Enter new price:");
        if (!newPrice) return;
        const priceNum = parseFloat(newPrice);
        if(isNaN(priceNum)) {
            toast.error("Invalid price");
            return;
        }

        try {
            await BookService.updatePrice(id, priceNum);
            toast.success("Price updated");
            loadBooks();
        } catch (error) {
            toast.error("Update failed");
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-slate-500 text-sm animate-pulse">Loading inventory data...</div>;
    }

    if (books.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-card border border-slate-100 p-12 text-center">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Package size={24}/>
                </div>
                <h3 className="text-slate-900 font-medium">No books found</h3>
                <p className="text-slate-500 text-sm mt-1">Start by adding a new book using the form above.</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-card border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock & Price</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                    {books.map((book) => (
                        <tr key={book.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4">
                                <div className="text-sm font-medium text-slate-900">{book.title}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{book.category}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-slate-700">{book.authorName}</div>
                                <div className="text-xs text-slate-400">ID: {book.authorId}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-xs text-slate-500"><span className="font-medium text-slate-700">Pub:</span> {book.publisherName}</div>
                                <div className="text-xs text-slate-500 mt-1 font-mono">{book.isbn}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-slate-900">${book.price.toFixed(2)}</span>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit ${
                                        book.quantity > 5 ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                                    }`}>
                            {book.quantity} in stock
                        </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => handleUpdatePrice(book.id)}
                                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                                        title="Edit Price"
                                    >
                                        <Edit2 size={16}/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book.isbn)}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                        title="Delete Book"
                                    >
                                        <Trash2 size={16}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}