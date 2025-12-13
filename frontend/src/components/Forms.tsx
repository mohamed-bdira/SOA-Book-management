import { useForm } from 'react-hook-form';
import { AuthorService, BookService, PublisherService } from '../services/api';
import { toast } from 'react-toastify';
import type {CreateAuthorRequest, CreateBookRequest, CreatePublisherRequest} from '../types';
import { UserPlus, Building, PlusCircle, AlertCircle } from 'lucide-react';

// Professional Input Styles
const inputGroupClass = "space-y-1.5";
const labelClass = "block text-xs font-semibold text-slate-700 uppercase tracking-wide";
const inputClass = "w-full bg-white text-slate-900 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 placeholder-slate-400 hover:border-slate-300";
const errorClass = "text-red-500 text-xs flex items-center gap-1 mt-1 font-medium";

const handleApiError = (error: any, setError: any) => {
    if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        Object.keys(apiErrors).forEach((field) => {
            setError(field, { type: 'manual', message: apiErrors[field] });
        });
        toast.error("Please correct the errors in the form.");
    } else {
        toast.error(error.response?.data?.message || "An unexpected error occurred");
    }
};

export function BookForm({ onSuccess }: { onSuccess: () => void }) {
    const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<CreateBookRequest>();

    const onSubmit = async (data: CreateBookRequest) => {
        try {
            await BookService.save(data);
            toast.success("Book successfully added to inventory");
            reset();
            onSuccess();
        } catch (err) {
            handleApiError(err, setError);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">Add New Book</h3>
                <span className="text-xs text-slate-400">All fields required</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                <div className={`${inputGroupClass} md:col-span-2`}>
                    <label className={labelClass}>Book Title</label>
                    <input {...register("title")} placeholder="Enter exact title" className={inputClass} />
                    {errors.title && <p className={errorClass}><AlertCircle size={12}/> {errors.title.message}</p>}
                </div>

                <div className={inputGroupClass}>
                    <label className={labelClass}>Category</label>
                    <input {...register("category")} placeholder="e.g. Non-Fiction" className={inputClass} />
                    {errors.category && <p className={errorClass}><AlertCircle size={12}/> {errors.category.message}</p>}
                </div>

                <div className={inputGroupClass}>
                    <label className={labelClass}>ISBN</label>
                    <input {...register("isbn")} placeholder="13-digit ISBN" className={inputClass} />
                    {errors.isbn && <p className={errorClass}><AlertCircle size={12}/> {errors.isbn.message}</p>}
                </div>

                <div className={inputGroupClass}>
                    <label className={labelClass}>Price</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-slate-400 text-sm">$</span>
                        <input {...register("price", { valueAsNumber: true })} type="number" step="0.01" className={`${inputClass} pl-6`} />
                    </div>
                    {errors.price && <p className={errorClass}><AlertCircle size={12}/> {errors.price.message}</p>}
                </div>

                <div className={inputGroupClass}>
                    <label className={labelClass}>Stock Quantity</label>
                    <input {...register("quantity", { valueAsNumber: true })} type="number" className={inputClass} />
                    {errors.quantity && <p className={errorClass}><AlertCircle size={12}/> {errors.quantity.message}</p>}
                </div>

                <div className="md:col-span-2 bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-2 gap-4">
                    <div className={inputGroupClass}>
                        <label className={labelClass}>Author ID</label>
                        <input {...register("authorId", { valueAsNumber: true })} type="number" placeholder="#" className={inputClass} />
                        {errors.authorId && <p className={errorClass}><AlertCircle size={12}/> {errors.authorId.message}</p>}
                    </div>
                    <div className={inputGroupClass}>
                        <label className={labelClass}>Publisher ID</label>
                        <input {...register("publisherId", { valueAsNumber: true })} type="number" placeholder="#" className={inputClass} />
                        {errors.publisherId && <p className={errorClass}><AlertCircle size={12}/> {errors.publisherId.message}</p>}
                    </div>
                </div>
            </div>

            <div className="pt-2">
                <button disabled={isSubmitting} type="submit" className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? <span className="animate-pulse">Saving...</span> : <><PlusCircle size={18} /> Register Book</>}
                </button>
            </div>
        </form>
    );
}

export function AuthorForm() {
    const { register, handleSubmit, setError, reset } = useForm<CreateAuthorRequest>();

    const onSubmit = async (data: CreateAuthorRequest) => {
        try {
            const res = await AuthorService.save(data);
            toast.success(
                <div>
                    <span className="font-bold">Author Created</span><br/>
                    <span className="text-xs text-slate-500">ID: {res.data.id}</span>
                </div>,
                { icon: <UserPlus className="text-indigo-600" size={20} /> }
            );
            reset();
        } catch (err) {
            handleApiError(err, setError);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-2 mb-2 text-slate-800">
                <UserPlus size={18} className="text-slate-500" />
                <h4 className="font-medium text-sm">New Author</h4>
            </div>
            <input {...register("name")} placeholder="Full Name" className={inputClass} />
            <input {...register("email")} placeholder="Email Address" className={inputClass} />
            <button type="submit" className="w-full py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm shadow-sm">
                Create Author
            </button>
        </form>
    );
}

export function PublisherForm() {
    const { register, handleSubmit, setError, reset } = useForm<CreatePublisherRequest>();

    const onSubmit = async (data: CreatePublisherRequest) => {
        try {
            await PublisherService.save(data);
            toast.success("Publisher Created", { icon: <Building className="text-indigo-600" size={20} /> });
            reset();
        } catch (err) {
            handleApiError(err, setError);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-2 mb-2 text-slate-800">
                <Building size={18} className="text-slate-500" />
                <h4 className="font-medium text-sm">New Publisher</h4>
            </div>
            <input {...register("name")} placeholder="Company Name" className={inputClass} />
            <input {...register("address")} placeholder="Address" className={inputClass} />
            <button type="submit" className="w-full py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm shadow-sm">
                Create Publisher
            </button>
        </form>
    );
}