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
  context: { caption?: string };
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showAllImages, setShowAllImages] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
        setImages(images.filter((img) => img.publicId !== publicId));
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleUpdateCaption = async (publicId: string, caption: string) => {
    try {
      const response = await fetch('/api/images/context', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId, caption }),
      });

      if (response.ok) {
        fetchImages();
      }
    } catch (error) {
      console.error('Caption update error:', error);
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

  const publishedCount = images.filter((img) => img.tags.length > 0).length;
  const draftCount = images.filter((img) => img.tags.length === 0).length;
  const displayName = user.email ? user.email.split('@')[0] : 'Admin';
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1) + '.';

  const sidebarItems = [
    { id: 'Overview', name: 'Overview', icon: Home },
    { id: 'Portfolio', name: 'Portfolio', icon: FolderOpen },
    { id: 'Settings', name: 'Settings', icon: Settings },
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
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-beige border border-ink/10 rounded-lg text-ink text-sm font-semibold hover:bg-beige-dark transition-colors mb-4"
        >
          <Plus className="w-4 h-4" />
          New Project
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
        {(activeTab === 'Overview' || activeTab === 'Portfolio') && (
          <>
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
              <div>
                <h1 className="text-2xl font-bold text-ink mb-1">
                  {activeTab === 'Overview' ? 'Dashboard Overview' : 'Portfolio'}
                </h1>
                <p className="text-ink/70 text-sm">
                  {activeTab === 'Overview'
                    ? `Welcome back, ${formattedName} Here is your recent activity summary.`
                    : 'Manage your portfolio items and collections.'}
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 px-5 py-3 bg-beige border border-ink/10 rounded-lg text-ink text-xs font-semibold uppercase tracking-wider hover:bg-beige-dark transition-colors shrink-0 disabled:opacity-50"
              >
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Quick Upload
              </button>
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
            <div className="bg-white border border-ink/10 rounded-xl shadow-sm overflow-hidden mb-10">
              <div className="p-6 border-b border-ink/10 flex justify-between items-center">
                <h2 className="font-semibold text-ink">Recent Activity</h2>
                {images.length > 5 && (
                  <button
                    onClick={() => setShowAllImages(!showAllImages)}
                    className="text-ink/60 hover:text-ink text-xs font-medium transition-colors"
                  >
                    {showAllImages ? 'Show Less' : 'View All'}
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
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
                      (showAllImages ? images : images.slice(0, 5)).map((img) => (
                        <tr key={img.publicId} className="group hover:bg-ink/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-14 rounded-lg overflow-hidden border border-ink/10 bg-beige/50 shrink-0">
                                <img
                                  src={img.url}
                                  alt="Work"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <input
                                  type="text"
                                  defaultValue={img.context?.caption || ''}
                                  onBlur={(e) => handleUpdateCaption(img.publicId, e.target.value)}
                                  placeholder="Add Name/Caption"
                                  className="bg-transparent border-b border-ink/10 focus:border-ink/40 outline-none font-medium text-ink text-sm w-full"
                                />
                                <p className="text-ink/50 text-xs mt-1">Ref: #{img.publicId.slice(-8).toUpperCase()}</p>
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
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity relative">
                              <button
                                onClick={() => handleDelete(img.publicId)}
                                className="p-2 hover:bg-red-50 rounded-lg text-ink/50 hover:text-red-600 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <div className="relative">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === img.publicId ? null : img.publicId); }}
                                  className="p-2 hover:bg-ink/5 rounded-lg text-ink/50 hover:text-ink transition-colors"
                                  title="More actions"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                                {openMenuId === img.publicId && (
                                  <div className="absolute right-0 top-full mt-1 py-1 bg-white border border-ink/10 rounded-lg shadow-lg z-50 min-w-[140px]">
                                    <Link
                                      to={img.tags[0] ? `/collections/${img.tags[0]}` : '/collections'}
                                      className="block px-4 py-2 text-sm text-ink hover:bg-ink/5"
                                      onClick={() => setOpenMenuId(null)}
                                    >
                                      View on site
                                    </Link>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleDelete(img.publicId); setOpenMenuId(null); }}
                                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
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
