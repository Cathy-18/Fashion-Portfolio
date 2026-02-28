import React, { useState, useEffect, useRef } from 'react';
import {
    Plus, Trash2, Tag, Loader2, CheckCircle2, XCircle,
    LayoutDashboard, FolderKanban, BarChart3, Settings as SettingsIcon,
    LogOut, Upload, Search, Filter, Eye, EyeOff, Edit3, Grid, Layers,
    ChevronLeft, ChevronRight, MoreHorizontal
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface CloudinaryImage {
    publicId: string;
    url: string;
    tags: string[];
    createdAt: string;
}

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [images, setImages] = useState<CloudinaryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [activeTab, setActiveTab] = useState('Current Works');

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/images');
            if (response.ok) {
                const data = await response.json();
                setImages(data);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setUploadMessage({ type: 'success', text: 'Masterpiece uploaded successfully.' });
                fetchImages();
            } else {
                setUploadMessage({ type: 'error', text: 'Upload failed. Please try again.' });
            }
        } catch (error) {
            setUploadMessage({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setIsUploading(false);
            setTimeout(() => setUploadMessage(null), 3000);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (publicId: string) => {
        if (!confirm('Are you certain you wish to remove this piece from the archives?')) return;

        try {
            const response = await fetch('/api/images', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ publicId }),
            });

            if (response.ok) {
                setImages(images.filter(img => img.publicId !== publicId));
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleClassify = async (publicId: string, tag: string) => {
        try {
            const response = await fetch('/api/images/classify', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ publicId, tag }),
            });

            if (response.ok) {
                fetchImages();
            }
        } catch (error) {
            console.error('Classification error:', error);
        }
    };

    if (!user) return null;

    const stats = [
        { label: 'Total Items', value: images.length, icon: Grid, color: 'text-luxury-gold' },
        { label: 'Published', value: images.filter(img => img.tags.length > 0).length, icon: Eye, color: 'text-green-500' },
        { label: 'Drafts', value: images.filter(img => img.tags.length === 0).length, icon: Edit3, color: 'text-orange-500' },
        { label: 'Hidden', value: 0, icon: EyeOff, color: 'text-red-500' },
    ];

    const sidebarItems = [
        { name: 'Dashboard', icon: LayoutDashboard },
        { name: 'Current Works', icon: FolderKanban },
        { name: 'Manage Collections', icon: Layers },
        { name: 'Analytics', icon: BarChart3 },
        { name: 'Settings', icon: SettingsIcon },
    ];

    return (
        <div className="min-h-screen bg-[#12110E] text-white flex">
            {/* Sidebar */}
            <aside className="w-72 bg-luxury-dark border-r border-white/5 flex flex-col p-8 fixed h-full">
                <div className="flex items-center gap-4 mb-16 px-2">
                    <div className="w-10 h-10 rounded-full bg-luxury-gold flex items-center justify-center font-serif text-luxury-black font-bold text-xl">
                        CN
                    </div>
                    <div>
                        <p className="font-serif text-lg tracking-wider">Admin Panel</p>
                        <p className="text-[10px] text-luxury-gold tracking-[0.2em] uppercase font-bold">Luxury Portfolio</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center gap-4 px-4 py-4 text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 rounded-lg group ${activeTab === item.name
                                ? 'bg-luxury-gold/10 text-luxury-gold shadow-lg shadow-luxury-gold/5 border border-luxury-gold/20'
                                : 'text-luxury-muted hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={logout}
                    className="flex items-center gap-4 px-4 py-4 text-xs tracking-[0.2em] font-bold uppercase text-red-400 hover:text-red-300 transition-colors mt-auto border-t border-white/5 pt-8"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-12">
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="font-serif text-5xl mb-3">Current Works</h1>
                        <p className="text-luxury-muted text-sm font-light">Manage your portfolio items and visibility status.</p>
                    </div>

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-luxury-gold text-luxury-black px-8 py-4 text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white transition-all flex items-center gap-3 shadow-xl shadow-luxury-gold/20"
                    >
                        <Plus className="w-4 h-4" /> Upload New Work
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleUpload}
                        className="hidden"
                        accept="image/*"
                    />
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-luxury-dark/40 border border-white/5 p-6 rounded-xl flex items-center justify-between group hover:border-luxury-gold/30 transition-all">
                            <div>
                                <p className="text-[10px] text-luxury-muted tracking-[0.2em] uppercase font-bold mb-2">{stat.label}</p>
                                <p className="text-3xl font-light">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Management Table Area */}
                <div className="bg-luxury-dark/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
                    {/* Table Header / Toolbar */}
                    <div className="p-6 border-b border-white/5 flex justify-between items-center gap-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted" />
                            <input
                                type="text"
                                placeholder="Search works..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-sm outline-none focus:border-luxury-gold/50 transition-all font-light"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-xs tracking-widest text-luxury-muted hover:text-white transition-all">
                                <Filter className="w-4 h-4" /> Sort by: Recent
                            </button>
                            <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-xs tracking-widest text-luxury-muted hover:text-white transition-all">
                                View All
                            </button>
                        </div>
                    </div>

                    {/* Results Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-[10px] tracking-[0.2em] uppercase text-luxury-muted border-b border-white/5 text-left">
                                    <th className="px-8 py-6 font-bold">Thumbnail</th>
                                    <th className="px-8 py-6 font-bold">Title</th>
                                    <th className="px-8 py-6 font-bold">Collection</th>
                                    <th className="px-8 py-6 font-bold">Date Added</th>
                                    <th className="px-8 py-6 font-bold">Status</th>
                                    <th className="px-8 py-6 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={6} className="py-20 text-center">
                                            <Loader2 className="w-10 h-10 text-luxury-gold animate-spin mx-auto opacity-20" />
                                        </td>
                                    </tr>
                                ) : images.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-20 text-center text-luxury-muted italic font-light">
                                            No works found in the archives.
                                        </td>
                                    </tr>
                                ) : images.map((img) => (
                                    <tr key={img.publicId} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-4">
                                            <div className="w-16 h-20 rounded-lg overflow-hidden border border-white/10 bg-luxury-dark">
                                                <img src={img.url} alt="Work" className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <p className="text-sm font-medium text-white mb-1">Seasonal Piece</p>
                                            <p className="text-[10px] text-luxury-muted tracking-widest font-light">Ref: #{img.publicId.slice(-8).toUpperCase()}</p>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="relative group/tag">
                                                <select
                                                    value={img.tags[0] || ""}
                                                    onChange={(e) => handleClassify(img.publicId, e.target.value)}
                                                    className="bg-luxury-gold/10 text-luxury-gold text-[10px] px-3 py-1.5 rounded-full border border-luxury-gold/30 outline-none uppercase tracking-widest font-bold cursor-pointer hover:bg-luxury-gold hover:text-luxury-black transition-all appearance-none pr-8"
                                                >
                                                    <option value="" className="bg-luxury-black">Not Assigned</option>
                                                    <option value="traditional" className="bg-luxury-black">Traditional</option>
                                                    <option value="modern" className="bg-luxury-black">Modern</option>
                                                    <option value="themed" className="bg-luxury-black">Themed</option>
                                                </select>
                                                <Tag className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <p className="text-xs text-luxury-muted font-light">
                                                {new Date(img.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${img.tags.length > 0 ? 'bg-green-500' : 'bg-orange-500 blur-[1px]'}`}></div>
                                                <span className={`text-[10px] tracking-widest uppercase font-bold ${img.tags.length > 0 ? 'text-green-500' : 'text-orange-500'}`}>
                                                    {img.tags.length > 0 ? 'Visible' : 'Draft'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-white/10 rounded-lg text-luxury-muted hover:text-white transition-all">
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(img.publicId)}
                                                    className="p-2 hover:bg-red-500/10 rounded-lg text-luxury-muted hover:text-red-500 transition-all font-light"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer / Pagination */}
                    <div className="p-6 border-t border-white/5 flex justify-between items-center text-luxury-muted">
                        <p className="text-[10px] tracking-widest uppercase">Showing 1 to {images.length} of {images.length} results</p>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-white/5 rounded transition-all"><ChevronLeft className="w-4 h-4" /></button>
                            <span className="w-8 h-8 flex items-center justify-center bg-luxury-gold text-luxury-black text-xs font-bold rounded">1</span>
                            <button className="p-2 hover:bg-white/5 rounded transition-all"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>

                {/* Upload Status Notification */}
                {uploadMessage && (
                    <div className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl border flex items-center gap-3 animate-luxury-fade shadow-2xl backdrop-blur-xl ${uploadMessage.type === 'success' ? 'bg-green-950/40 border-green-500/30 text-green-200' : 'bg-red-950/40 border-red-500/30 text-red-200'
                        }`}>
                        {uploadMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                        <span className="text-xs tracking-widest font-bold uppercase">{uploadMessage.text}</span>
                    </div>
                )}
            </main>
        </div>
    );
}
