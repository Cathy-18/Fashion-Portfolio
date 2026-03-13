import React, { useState, useEffect, useRef } from 'react';
import {
  Plus, Trash2, Loader2, CheckCircle2, XCircle,
  Home, FolderOpen, MessageCircle, BarChart3, Settings,
  LogOut, Upload, Edit3, MoreHorizontal, Palette, Eye, Mail,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface CloudinaryImage {
  publicId: string;
  url: string;
  tags: string[];
  context: { caption?: string; title?: string; subtitle?: string; bio?: string; description?: string };
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [portraitImage, setPortraitImage] = useState<CloudinaryImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showAllImages, setShowAllImages] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isSavingAbout, setIsSavingAbout] = useState(false);
  const [aboutForm, setAboutForm] = useState({
    title: 'Catherine Nixon',
    subtitle: 'Visionary Couturier & Creative Director',
    bio: 'Catherine Nixon is a contemporary fashion illustrator who transforms garments into visual poetry. Her work navigates the dialogue between architectural precision and flowing movement, revealing the quiet power within modern femininity. Through deliberate line, texture, and shadow, she presents fashion not merely as clothing, but as atmosphere — refined, evocative, and distinctly modern.',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const portraitFileInputRef = useRef<HTMLInputElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId]);

  useEffect(() => {
    fetchImages();
    fetchPortrait();
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

  const fetchPortrait = async () => {
    try {
      const response = await fetch('/api/portrait');
      if (response.ok) {
        const data = await response.json();
        setPortraitImage(data);
        // Populate about form from portrait context
        if (data.context) {
          setAboutForm(prev => ({
            title: data.context.title || prev.title,
            subtitle: data.context.subtitle || prev.subtitle,
            bio: data.context.bio || prev.bio,
          }));
        }
      }
    } catch (error) {
      // 404 = no portrait yet, that's fine
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
        const data = await response.json();

        // Optimistic injection
        const newImage: CloudinaryImage = {
          publicId: data.publicId,
          url: data.imageUrl,
          tags: [],
          context: {},
          createdAt: new Date().toISOString()
        };
        setImages(prev => [newImage, ...prev]);

        setUploadMessage({ type: 'success', text: 'Masterpiece uploaded successfully.' });
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

  const handlePortraitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload/portrait', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        // Optimistic update — display the portrait immediately
        const newPortrait: CloudinaryImage = {
          publicId: data.publicId,
          url: data.imageUrl,
          tags: ['portrait'],
          context: {},
          createdAt: new Date().toISOString()
        };
        setPortraitImage(newPortrait);

        setUploadMessage({ type: 'success', text: 'Portrait uploaded successfully.' });
      } else {
        setUploadMessage({ type: 'error', text: 'Upload failed. Please try again.' });
      }
    } catch (error) {
      setUploadMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadMessage(null), 3000);
      if (portraitFileInputRef.current) portraitFileInputRef.current.value = '';
    }
  };

  const handleSaveAboutInfo = async () => {
    setIsSavingAbout(true);
    if (!portraitImage) {
      setUploadMessage({ type: 'error', text: 'Upload a portrait image first.' });
      setIsSavingAbout(false);
      setTimeout(() => setUploadMessage(null), 3000);
      return;
    }

    try {
      const response = await fetch('/api/images/context', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicId: portraitImage.publicId,
          contextObj: {
            caption: portraitImage.context?.caption || '',
            title: aboutForm.title,
            subtitle: aboutForm.subtitle,
            bio: aboutForm.bio,
          }
        }),
      });

      if (response.ok) {
        setUploadMessage({ type: 'success', text: 'About details updated successfully.' });
        fetchPortrait();
      } else {
        setUploadMessage({ type: 'error', text: 'Failed to save, please try again.' });
      }
    } catch (error) {
      setUploadMessage({ type: 'error', text: 'Failed to update about details.' });
    } finally {
      setIsSavingAbout(false);
      setTimeout(() => setUploadMessage(null), 3000);
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
        setImages(images.filter((img) => img.publicId !== publicId));
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleUpdateContext = async (publicId: string, contextObj: any) => {
    try {
      const response = await fetch('/api/images/context', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId, contextObj }),
      });

      if (response.ok) {
        fetchImages();
      }
    } catch (error) {
      console.error('Context update error:', error);
    }
  };

  const handleClassify = async (publicId: string, tag: string) => {
    try {
      // Optimistic update
      setImages(prev => prev.map(img =>
        img.publicId === publicId ? { ...img, tags: [tag] } : img
      ));

      const response = await fetch('/api/images/classify', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId, tag }),
      });

      if (!response.ok) {
        fetchImages(); // Revert on failure
      }
    } catch (error) {
      console.error('Classification error:', error);
    }
  };

  if (!user) return null;

  const publishedCount = images.filter((img) => img.tags.length > 0).length;
  const draftCount = images.filter((img) => img.tags.length === 0).length;
  const displayName = user.email ? user.email.split('@')[0] : 'Admin';
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1) + '.';

  const sidebarItems = [
    { id: 'Overview', name: 'Overview', icon: Home },
    { id: 'Portfolio', name: 'Portfolio', icon: FolderOpen },
    { id: 'Messages', name: 'Messages', icon: MessageCircle },
  ];

  const statusBadge = (img: CloudinaryImage) => {
    const hasTags = img.tags.length > 0;
    const status = hasTags ? 'PUBLISHED' : 'DRAFT';
    const bgClass = hasTags ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800';
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${bgClass}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-off-white text-ink flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-ink/10 flex flex-col pt-24 px-6 pb-6 fixed top-20 h-[calc(100vh-5rem)]">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center font-serif text-ink font-bold text-lg">
            CN
          </div>
          <div>
            <p className="font-semibold text-ink">Admin Dashboard</p>
            <p className="text-ink/60 text-sm">{formattedName}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id
                ? 'bg-beige text-ink'
                : 'text-ink/70 hover:bg-ink/5 hover:text-ink'
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                {item.name}
              </div>
            </button>
          ))}
        </nav>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-beige border border-ink/10 rounded-lg text-ink text-sm font-semibold hover:bg-beige-dark transition-colors mb-4 disabled:opacity-50"
        >
          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          {isUploading ? 'Uploading...' : 'New Project'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
          accept="image/*"
        />

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-ink/60 hover:text-red-600 text-sm font-medium transition-colors mt-auto pt-6 border-t border-ink/10"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 pt-24 px-8 pb-8">
        {activeTab === 'Overview' && (
          <>
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
              <div>
                <h1 className="text-2xl font-bold text-ink mb-1">Dashboard Overview</h1>
                <p className="text-ink/70 text-sm">
                  Welcome back, {formattedName} Here is your recent activity summary.
                </p>
              </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white border border-ink/10 rounded-xl p-6 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-ink/60 text-xs font-semibold uppercase tracking-wider mb-1">Total Artworks</p>
                  <p className="text-2xl font-bold text-ink">{images.length}</p>
                  <p className="text-green-600 text-xs font-medium mt-1 flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 rotate-[270deg]" />
                    +{images.length > 0 ? Math.round((publishedCount / images.length) * 10) : 0}% this month
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-beige/50 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-ink/70" />
                </div>
              </div>
              <div className="bg-white border border-ink/10 rounded-xl p-6 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-ink/60 text-xs font-semibold uppercase tracking-wider mb-1">Published</p>
                  <p className="text-2xl font-bold text-ink">{publishedCount}</p>
                  <p className="text-green-600 text-xs font-medium mt-1 flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 rotate-[270deg]" />
                    Live on site
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-beige/50 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-ink/70" />
                </div>
              </div>
              <div className="bg-white border border-ink/10 rounded-xl p-6 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-ink/60 text-xs font-semibold uppercase tracking-wider mb-1">Drafts</p>
                  <p className="text-2xl font-bold text-ink">{draftCount}</p>
                  <p className="text-ink/60 text-xs font-medium mt-1">Unassigned</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-beige/50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-ink/70" />
                </div>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white border border-ink/10 rounded-xl shadow-sm mb-10">
              <div className="p-6 border-b border-ink/10 flex justify-between items-center">
                <h2 className="font-semibold text-ink">Recent Activity</h2>
                {images.filter(img => !img.tags.includes('portrait')).length > 3 && (
                  <button
                    onClick={() => setShowAllImages(!showAllImages)}
                    className="text-ink/60 hover:text-ink text-xs font-medium transition-colors"
                  >
                    {showAllImages ? 'Show Less' : 'View All'}
                  </button>
                )}
              </div>
              <div className="overflow-x-auto overflow-y-visible">
                <table className="w-full">
                  <thead>
                    <tr className="text-[10px] tracking-wider uppercase text-ink/60 font-semibold bg-ink/[0.02] text-left">
                      <th className="px-6 py-4">Artwork Name</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Collection</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="py-16 text-center">
                          <Loader2 className="w-8 h-8 text-ink/30 animate-spin mx-auto" />
                        </td>
                      </tr>
                    ) : images.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-16 text-center text-ink/50 text-sm">
                          No works found in the archives.
                        </td>
                      </tr>
                    ) : (
                      (showAllImages
                        ? images.filter(img => !img.tags.includes('portrait'))
                        : images.filter(img => !img.tags.includes('portrait')).slice(0, 3)
                      ).map((img) => (
                        <tr key={img.publicId} className="group hover:bg-ink/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-4">
                              <div className="w-16 h-20 rounded-lg overflow-hidden border border-ink/10 bg-beige/50 shrink-0 mt-1">
                                <img
                                  src={img.url}
                                  alt="Work"
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div className="flex-1">
                                <input
                                  type="text"
                                  defaultValue={img.context?.caption || ''}
                                  onBlur={(e) => handleUpdateContext(img.publicId, { ...img.context, caption: e.target.value })}
                                  placeholder="Add Name/Caption"
                                  className="bg-transparent border-b border-ink/10 focus:border-ink/40 outline-none font-medium text-ink text-sm w-full mb-2 pb-1"
                                />
                                <textarea
                                  defaultValue={img.context?.description || ''}
                                  onBlur={(e) => handleUpdateContext(img.publicId, { ...img.context, description: e.target.value })}
                                  placeholder="Add a small description..."
                                  className="bg-transparent border-b border-ink/10 focus:border-ink/40 outline-none text-ink/70 text-xs w-full resize-none pb-1"
                                  rows={2}
                                />
                                <p className="text-ink/40 text-[10px] mt-1 uppercase tracking-wider">Ref: #{img.publicId.slice(-8).toUpperCase()}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-ink/70">
                            {new Date(img.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={img.tags[0] || ''}
                              onChange={(e) => handleClassify(img.publicId, e.target.value)}
                              className="bg-transparent border border-ink/20 rounded-lg px-3 py-1.5 text-xs text-ink outline-none focus:border-ink/40 cursor-pointer"
                            >
                              <option value="">Not Assigned</option>
                              <option value="traditional">Traditional</option>
                              <option value="modern">Modern</option>
                              <option value="themed">Themed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">{statusBadge(img)}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Link
                                to={img.tags[0] ? `/collections/${img.tags[0]}` : '/collections'}
                                className="px-3 py-1.5 text-xs font-medium text-ink border border-ink/20 rounded-lg hover:bg-beige transition-colors"
                              >
                                View on site
                              </Link>
                              <button
                                onClick={() => handleDelete(img.publicId)}
                                className="p-1.5 hover:bg-red-50 rounded-lg text-ink/50 hover:text-red-600 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-ink/10 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-ink mb-4 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-ink/60" />
                  Upcoming Deadlines
                </h3>
                <p className="text-ink/60 text-sm">No upcoming deadlines.</p>
              </div>
              <div className="bg-white border border-ink/10 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-ink mb-4">Editor&apos;s Note</h3>
                <p className="text-ink/70 text-sm leading-relaxed">
                  Remember to focus on the texture details for the upcoming scarf collection. Tag new uploads to the appropriate collection for visibility on the site.
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Portfolio' && (
          <div className="space-y-8 max-w-5xl">
            <header>
              <h1 className="text-2xl font-bold text-ink mb-1">About Page & Portfolio</h1>
              <p className="text-ink/70 text-sm">Manage your biography, title, and portrait image.</p>
            </header>

            <div className="bg-white border border-ink/10 rounded-xl p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Portrait Image Column */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4 text-center lg:text-left w-full">Portrait Display</h3>
                <div className="relative aspect-[3/4] w-full max-w-[320px] rounded-lg overflow-hidden bg-beige border border-ink/10 mb-6 shadow-sm">
                  {portraitImage ? (
                    <img
                      src={portraitImage.url}
                      alt="Portrait"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-ink/40">
                      <Palette className="w-12 h-12 mb-4 opacity-30" />
                      <span className="text-xs uppercase tracking-[0.2em] font-bold">No Portrait Found</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-ink/50 leading-relaxed max-w-[320px]">
                  This image is fetched from your Cloudinary <code className="bg-beige px-1 rounded">luxury-portfolio/profile</code> folder.
                </p>
              </div>

              {/* Text Content Column */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                <div className="border-b border-ink/5 pb-4">
                  <h3 className="text-sm font-semibold text-ink uppercase tracking-wider">Biography Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-ink/50 uppercase tracking-[0.2em] mb-3">Name / Title</label>
                    <input
                      type="text"
                      value={aboutForm.title}
                      onChange={(e) => setAboutForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-[#FBFBF8] border border-ink/10 rounded-lg px-4 py-3.5 text-sm text-ink outline-none focus:border-ink/40 transition-colors font-serif shadow-inner"
                      placeholder="E.g. Catherine Nixon"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-ink/50 uppercase tracking-[0.2em] mb-3">Subtitle / Role</label>
                    <input
                      type="text"
                      value={aboutForm.subtitle}
                      onChange={(e) => setAboutForm(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full bg-[#FBFBF8] border border-ink/10 rounded-lg px-4 py-3.5 text-sm text-ink outline-none focus:border-ink/40 transition-colors shadow-inner"
                      placeholder="E.g. Visionary Couturier"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-ink/50 uppercase tracking-[0.2em] mb-3">Biography Text</label>
                  <textarea
                    value={aboutForm.bio}
                    onChange={(e) => setAboutForm(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full bg-[#FBFBF8] border border-ink/10 rounded-lg px-4 py-4 text-sm text-ink outline-none focus:border-ink/40 transition-colors min-h-[240px] resize-y leading-relaxed shadow-inner"
                    placeholder="Enter your biography here..."
                  />
                  <p className="text-right text-[10px] text-ink/40 mt-2 font-medium">Auto-formats line breaks on display.</p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleSaveAboutInfo}
                    disabled={isSavingAbout}
                    className="px-10 py-4 bg-[#1A1915] text-white text-[10px] uppercase tracking-[0.3em] font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-3 disabled:opacity-50 shadow-md"
                  >
                    {isSavingAbout ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit3 className="w-4 h-4" />}
                    {isSavingAbout ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Messages' && (
          <div className="space-y-8">
            <header>
              <h1 className="text-2xl font-bold text-ink mb-1">Messages</h1>
              <p className="text-ink/70 text-sm">Inquiries and messages from visitors.</p>
            </header>
            <div className="bg-white border border-ink/10 rounded-xl p-16 text-center shadow-sm">
              <MessageCircle className="w-16 h-16 text-ink/20 mx-auto mb-4" />
              <p className="text-ink/60 text-sm">No messages yet.</p>
            </div>
          </div>
        )}

        {activeTab === 'Analytics' && (
          <div className="space-y-8">
            <header>
              <h1 className="text-2xl font-bold text-ink mb-1">Analytics</h1>
              <p className="text-ink/70 text-sm">View traffic and engagement metrics.</p>
            </header>
            <div className="bg-white border border-ink/10 rounded-xl p-16 text-center shadow-sm">
              <BarChart3 className="w-16 h-16 text-ink/20 mx-auto mb-4" />
              <p className="text-ink/60 text-sm">Analytics coming soon.</p>
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="space-y-8">
            <header>
              <h1 className="text-2xl font-bold text-ink mb-1">Settings</h1>
              <p className="text-ink/70 text-sm">Manage your account and preferences.</p>
            </header>
            <div className="bg-white border border-ink/10 rounded-xl p-16 text-center shadow-sm">
              <Settings className="w-16 h-16 text-ink/20 mx-auto mb-4" />
              <p className="text-ink/60 text-sm">Settings coming soon.</p>
            </div>
          </div>
        )}

        {/* Upload Status Notification */}
        {uploadMessage && (
          <div
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg border flex items-center gap-3 shadow-lg ${uploadMessage.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
              }`}
          >
            {uploadMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className="text-sm font-medium">{uploadMessage.text}</span>
          </div>
        )}
      </main>
    </div>
  );
}
