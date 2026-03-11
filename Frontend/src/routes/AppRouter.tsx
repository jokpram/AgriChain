import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Sidebar from '../components/Sidebar';
import { HiShieldExclamation } from 'react-icons/hi2';

// Public Pages
import LandingPage from '../pages/public/LandingPage';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import AdminBatches from '../pages/admin/Batches';

// Farmer Pages
import FarmerDashboard from '../pages/farmer/Dashboard';
import Farms from '../pages/farmer/Farms';
import Harvest from '../pages/farmer/Harvest';
import MyBatches from '../pages/farmer/MyBatches';
import Products from '../pages/farmer/Products';
import Withdrawals from '../pages/farmer/Withdrawals';

// Distributor Pages
import DistributorDashboard from '../pages/distributor/Dashboard';
import AvailableBatches from '../pages/distributor/AvailableBatches';
import Distribution from '../pages/distributor/Distribution';
import DistributorSettings from '../pages/distributor/Settings';

// Buyer Pages
import Marketplace from '../pages/buyer/Marketplace';
import Orders from '../pages/buyer/Orders';

// Shared Pages
import Profile from '../pages/shared/Profile';

const Unauthorized = () => (
    <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="text-center">
            <HiShieldExclamation className="w-16 h-16 text-red-400 mx-auto" />
            <h1 className="text-2xl font-bold text-surface-800 mt-4">Akses Ditolak</h1>
            <p className="text-surface-500 mt-2">Anda tidak memiliki izin untuk mengakses halaman ini</p>
            <a href="/login" className="inline-block mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
                Kembali ke Login
            </a>
        </div>
    </div>
);

const AppRouter = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ToastProvider>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />

                        {/* Admin routes */}
                        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><Sidebar /></ProtectedRoute>}>
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="users" element={<Users />} />
                            <Route path="batches" element={<AdminBatches />} />
                            <Route path="profile" element={<Profile />} />
                            <Route index element={<Navigate to="dashboard" replace />} />
                        </Route>

                        {/* Farmer routes */}
                        <Route path="/farmer" element={<ProtectedRoute roles={['petani']}><Sidebar /></ProtectedRoute>}>
                            <Route path="dashboard" element={<FarmerDashboard />} />
                            <Route path="farms" element={<Farms />} />
                            <Route path="harvest" element={<Harvest />} />
                            <Route path="batches" element={<MyBatches />} />
                            <Route path="products" element={<Products />} />
                            <Route path="withdrawals" element={<Withdrawals />} />
                            <Route path="profile" element={<Profile />} />
                            <Route index element={<Navigate to="dashboard" replace />} />
                        </Route>

                        <Route path="/distributor" element={<ProtectedRoute roles={['distributor']}><Sidebar /></ProtectedRoute>}>
                            <Route path="dashboard" element={<DistributorDashboard />} />
                            <Route path="available" element={<AvailableBatches />} />
                            <Route path="distributions" element={<Distribution />} />
                            <Route path="settings" element={<DistributorSettings />} />
                            <Route path="profile" element={<Profile />} />
                            <Route index element={<Navigate to="dashboard" replace />} />
                        </Route>

                        {/* Buyer routes */}
                        <Route path="/buyer" element={<ProtectedRoute roles={['pembeli']}><Sidebar /></ProtectedRoute>}>
                            <Route path="marketplace" element={<Marketplace />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="profile" element={<Profile />} />
                            <Route index element={<Navigate to="marketplace" replace />} />
                        </Route>

                        {/* Redirect unknown routes */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </ToastProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default AppRouter;
