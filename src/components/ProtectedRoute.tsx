import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center">
                <div className="w-8 h-8 border-t-2 border-luxury-gold rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
