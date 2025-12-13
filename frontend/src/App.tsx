import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookList from './components/BookList';
import { AuthorForm, BookForm, PublisherForm } from './components/Forms';
import { Library } from 'lucide-react';

function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshList = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">

            {/* Navbar / Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                            <Library size={20} />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">
                            Tome<span className="text-indigo-600">Library</span>
                        </h1>
                    </div>
                    <div className="text-sm font-medium text-slate-500">
                        Admin Dashboard
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Main Content Area (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        <section className="bg-white rounded-xl shadow-card border border-slate-100 p-6">
                            <BookForm onSuccess={refreshList} />
                        </section>

                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-slate-800">Inventory Management</h2>
                                <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                  Live Data
                </span>
                            </div>
                            <BookList refreshTrigger={refreshKey} />
                        </section>
                    </div>

                    {/* Sidebar (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-xl shadow-card border border-slate-100 p-6">
                            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                                Quick Actions
                            </h3>
                            <div className="space-y-6">
                                <AuthorForm />
                                <div className="w-full h-px bg-slate-100"></div>
                                <PublisherForm />
                            </div>
                        </div>

                        <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                            <h4 className="text-indigo-900 font-semibold mb-1">Pro Tip</h4>
                            <p className="text-sm text-indigo-700 leading-relaxed">
                                Ensure you have created an Author and a Publisher before attempting to register a new book. You will need their generated IDs.
                            </p>
                        </div>
                    </div>

                </div>
            </main>

            {/* Modern Toast Styles */}
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{
                    backgroundColor: 'white',
                    color: '#1e293b',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem'
                }}
            />
        </div>
    );
}

export default App;