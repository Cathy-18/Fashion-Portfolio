import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Upload, Image as ImageIcon, X, CheckCircle2, Trash2, Tag, Loader2, RefreshCw } from 'lucide-react';

interface CloudinaryImage {
    publicId: string;
    url: string;
    tags: string[];
    createdAt: string;
}

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [images, setImages] = useState<CloudinaryImage[]>([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const seasons = ['Winter', 'Autumn', 'Spring', 'Summer'];

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setIsFetching(true);
        try {
            const response = await fetch('/api/images');
            if (response.ok) {
                const data = await response.json();
                setImages(data);
            }
        } catch (err) {
            console.error('Failed to fetch images:', err);
        } finally {
            setIsFetching(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setUploadedImageUrl(null);
            setError('');
            setSuccessMessage('');
        }
    };

    const cancelUpload = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setError('');
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setUploadedImageUrl(data.imageUrl);
                setSelectedFile(null);
                setPreviewUrl(null);
                setSuccessMessage('Image uploaded successfully!');
                fetchImages(); // Refresh gallery
            } else {
                setError(data.error || 'Failed to upload image');
            }
        } catch (err) {
            setError('An error occurred during upload. Please try again.');
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (publicId: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            const response = await fetch('/api/images', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ publicId }),
            });

            if (response.ok) {
                setSuccessMessage('Image deleted successfully');
                fetchImages();
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to delete image');
            }
        } catch (err) {
            setError('Error deleting image');
            console.error(err);
        }
    };

    const handleClassify = async (publicId: string, category: string) => {
        try {
            const response = await fetch('/api/images/classify', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ publicId, category }),
            });

            if (response.ok) {
                setSuccessMessage(`Image classified as ${category}`);
                fetchImages();
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to classify image');
            }
        } catch (err) {
            setError('Error classifying image');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-luxury-black text-white pt-24 pb-12 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-serif tracking-widest uppercase mb-2">Admin Dashboard</h1>
                        <p className="text-luxury-muted tracking-wider text-sm">Welcome back, {user?.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="mt-4 md:mt-0 text-xs tracking-widest uppercase border border-white/30 px-6 py-2 hover:bg-white hover:text-luxury-black transition-colors"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Notifications */}
                {(error || successMessage) && (
                    <div className={`mb-8 p-4 rounded text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${error ? 'bg-red-900/30 border border-red-500/30 text-red-200' : 'bg-green-900/30 border border-green-500/30 text-green-200'
                        }`}>
                        {error ? <X className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        {error || successMessage}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Upload Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 border border-white/10 p-8 rounded-lg shadow-2xl sticky top-32">
                            <h2 className="text-xl font-serif tracking-wider uppercase mb-6 flex items-center gap-3">
                                <Upload className="text-luxury-gold w-5 h-5" />
                                New Upload
                            </h2>

                            <div className="space-y-6">
                                <div className={`border-2 border-dashed ${previewUrl ? 'border-luxury-gold' : 'border-white/20'} rounded-lg p-8 flex flex-col items-center justify-center relative group hover:border-luxury-gold transition-colors`}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-luxury-gold/20 transition-all">
                                        <ImageIcon className={`w-6 h-6 ${previewUrl ? 'text-luxury-gold' : 'text-luxury-muted'}`} />
                                    </div>
                                    <p className="text-[10px] tracking-widest uppercase text-center">
                                        {previewUrl ? 'Change Selection' : 'Select Fine Art Image'}
                                    </p>
                                </div>

                                {previewUrl && (
                                    <div className="space-y-4 animate-in fade-in duration-500">
                                        <div className="relative aspect-[3/4] border border-white/20 rounded overflow-hidden">
                                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                            <button onClick={cancelUpload} className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full hover:bg-red-500/80 transition-colors">
                                                <X className="w-3 h-3 text-white" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleUpload}
                                            disabled={isUploading}
                                            className="w-full bg-luxury-gold text-luxury-black uppercase tracking-[0.2em] text-xs py-4 font-bold hover:bg-white transition-all duration-500 disabled:opacity-50 flex justify-center items-center gap-2"
                                        >
                                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Upload'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Gallery Section */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-serif tracking-widest uppercase">Portfolio Gallery</h2>
                            <button onClick={fetchImages} className="text-luxury-gold hover:text-white transition-colors">
                                <RefreshCw className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} />
                            </button>
                        </div>

                        {isFetching && images.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-luxury-muted">
                                <Loader2 className="w-12 h-12 animate-spin mb-4 opacity-20" />
                                <p className="text-xs uppercase tracking-widest">Loading collection...</p>
                            </div>
                        ) : images.length === 0 ? (
                            <div className="bg-white/5 border border-dashed border-white/10 rounded-lg py-24 flex flex-col items-center text-luxury-muted">
                                <ImageIcon className="w-16 h-16 mb-4 opacity-10" />
                                <p className="text-xs uppercase tracking-widest">Gallery is currently empty</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {images.map((img) => (
                                    <div key={img.publicId} className="group bg-white/5 border border-white/10 overflow-hidden rounded-lg transition-all hover:bg-white/10">
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            <img src={img.url} alt="Gallery item" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                <button
                                                    onClick={() => handleDelete(img.publicId)}
                                                    className="bg-red-500/80 p-3 rounded-full hover:bg-red-600 transition-colors"
                                                    title="Delete Image"
                                                >
                                                    <Trash2 className="w-5 h-5 text-white" />
                                                </button>
                                            </div>
                                            {img.tags.length > 0 && (
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-luxury-gold text-luxury-black text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">
                                                        {img.tags[0]}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-luxury-muted">
                                                <Tag className="w-3 h-3" />
                                                <span className="uppercase tracking-widest">Collection:</span>
                                            </div>
                                            <select
                                                value={img.tags[0] || ''}
                                                onChange={(e) => handleClassify(img.publicId, e.target.value)}
                                                className="bg-black/50 border border-white/10 rounded px-2 py-1 text-[10px] uppercase tracking-wider text-luxury-gold focus:outline-none focus:border-luxury-gold transition-colors"
                                            >
                                                <option value="" disabled>Select Season</option>
                                                {seasons.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
