import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from './Navbar';
import {
    HiChartBarSquare, HiUsers, HiCube, HiHome, HiMap,
    HiSun, HiArchiveBox, HiTruck, HiInboxArrowDown,
    HiShoppingCart, HiClipboardDocumentList, HiSparkles, HiBuildingStorefront, HiBanknotes, HiCog6Tooth, HiXMark
} from 'react-icons/hi2';
import { FaLeaf } from 'react-icons/fa6';

interface MenuItem {
    path: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

const menuMap: Record<string, MenuItem[]> = {
    admin: [
        { path: '/admin/dashboard', label: 'Dashboard', icon: HiChartBarSquare },
        { path: '/admin/users', label: 'Users', icon: HiUsers },
        { path: '/admin/batches', label: 'Batches', icon: HiCube },
    ],
    petani: [
        { path: '/farmer/dashboard', label: 'Dashboard', icon: HiHome },
        { path: '/farmer/farms', label: 'Lahan', icon: HiMap },
        { path: '/farmer/harvest', label: 'Panen', icon: HiSun },
        { path: '/farmer/batches', label: 'Batch Saya', icon: HiArchiveBox },
        { path: '/farmer/products', label: 'Produk & Etalase', icon: HiBuildingStorefront },
        { path: '/farmer/withdrawals', label: 'Keuangan', icon: HiBanknotes },
    ],
    distributor: [
        { path: '/distributor/dashboard', label: 'Dashboard', icon: HiHome },
        { path: '/distributor/available', label: 'Batch Tersedia', icon: HiInboxArrowDown },
        { path: '/distributor/distributions', label: 'Distribusi', icon: HiTruck },
        { path: '/distributor/settings', label: 'Pengaturan', icon: HiCog6Tooth },
    ],
    pembeli: [
        { path: '/buyer/marketplace', label: 'Marketplace', icon: HiShoppingCart },
        { path: '/buyer/orders', label: 'Pesanan', icon: HiClipboardDocumentList },
    ],
};

const Sidebar = () => {
    const { user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menu = user ? menuMap[user.role] || [] : [];

    return (
        <div className="min-h-screen flex">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-surface-200 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-4 border-b border-surface-100 flex items-center justify-between lg:block">
                    <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Menu</p>
                    <button
                        className="lg:hidden p-1 text-surface-400 hover:text-surface-700 hover:bg-surface-100 rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <HiXMark className="w-5 h-5" />
                    </button>
                </div>
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Main Navigation">
                    {menu.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)} // Close menu on mobile when a link is clicked
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-800'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" aria-hidden="true" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t border-surface-100 mt-auto">
                    <div className="flex items-center gap-2 px-3 py-2 bg-primary-50/50 rounded-lg">
                        <FaLeaf className="w-3.5 h-3.5 text-primary-500" />
                        <p className="text-[11px] text-primary-600 font-medium font-mono tracking-tight">AgriChain v1.0</p>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden w-full lg:w-[calc(100%-16rem)]">
                <Navbar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                <section className="flex-1 p-4 md:p-6 bg-surface-50 overflow-auto" aria-label="Main Content Area">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default Sidebar;
