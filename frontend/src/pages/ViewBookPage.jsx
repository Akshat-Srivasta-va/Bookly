import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Clock, User, Calendar } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS, BASE_URL } from "../utils/apiPath";

const ViewBookPage = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axiosInstance.get(
                    `${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`
                );
                setBook(response.data);
            } catch (error) {
                toast.error("Failed to load book details.");
                navigate("/dashboard");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBook();
    }, [bookId, navigate]);

    if(isLoading) {
        return (
            <DashboardLayout>
                 <div className="flex h-screen items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                 </div>
            </DashboardLayout>
        )
    }

    if (!book) return null;

     const coverImageUrl = book.coverImage ? `${BASE_URL}/backend${book.coverImage}`.replace(/\\/g, "/") : "";


  return (
    <DashboardLayout>
        <div className="container mx-auto p-6 max-w-5xl">
            <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="mb-6 hover:bg-slate-100"
            >
                <ArrowLeft className="w-4 h-4 mr-2"/>
                Back to Dashboard
            </Button>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Book Header Section */}
                <div className="relative h-48 bg-gradient-to-r from-slate-900 to-slate-800">
                     <div className="absolute -bottom-16 left-8 flex items-end">
                         <div className="relative w-32 aspect-[2/3] rounded-lg shadow-xl overflow-hidden bg-slate-200 border-4 border-white">
                            {coverImageUrl ? (
                                <img 
                                src={coverImageUrl} 
                                alt={book.title} 
                                className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                                    No Cover
                                </div>
                            )}
                         </div>
                     </div>
                </div>

                <div className="pt-20 px-8 pb-8">
                     <div className="flex justify-between items-start">
                        <div>
                             <h1 className="text-3xl font-bold text-slate-900 mb-2">{book.title}</h1>
                             {book.subtitle && (
                                <p className="text-xl text-slate-500 mb-4">{book.subtitle}</p>
                             )}
                             
                             <div className="flex flex-wrap gap-6 text-slate-600 text-sm mb-6">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2 text-indigo-500"/>
                                    {book.author}
                                </div>
                                 <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-indigo-500"/>
                                    Last updated {new Date(book.updatedAt).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-indigo-500"/>
                                    Created {new Date(book.createdAt).toLocaleDateString()}
                                </div>
                             </div>
                        </div>

                        <Button onClick={() => navigate(`/editor/${book._id}`)} icon={Edit}>
                            Edit Book
                        </Button>
                     </div>

                     <div className="border-t border-slate-200 pt-8 mt-4">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4">Chapters ({book.chapters?.length || 0})</h2>
                        <div className="grid gap-4">
                            {book.chapters?.map((chapter, index) => (
                                <div key={index} className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                                    <h3 className="font-medium text-slate-900 mb-1">
                                        <span className="text-slate-400 mr-2">{index + 1}.</span>
                                        {chapter.title}
                                    </h3>
                                    {chapter.description && (
                                        <p className="text-slate-500 text-sm ml-6 line-clamp-2">{chapter.description}</p>
                                    )}
                                </div>
                            ))}
                            {(!book.chapters || book.chapters.length === 0) && (
                                <p className="text-slate-500 italic">No chapters created yet.</p>
                            )}
                        </div>
                     </div>
                </div>
            </div>
        </div>
    </DashboardLayout>
  )
}

export default ViewBookPage