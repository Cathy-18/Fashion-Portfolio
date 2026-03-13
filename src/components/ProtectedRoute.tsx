import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
                <div className="w-8 h-8 border-t-2 border-[#E9A825] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        // Use replace to prevent back-button loops
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
}
