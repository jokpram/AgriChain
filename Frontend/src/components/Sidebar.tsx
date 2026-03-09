import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from './Navbar';
import {
    HiChartBarSquare, HiUsers, HiCube, HiHome, HiMap,
    HiSun, HiArchiveBox, HiTruck, HiInboxArrowDown,
    HiShoppingCart, HiClipboardDocumentList, HiSparkles
} from 'react-icons/hi2';

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
    ],
    distributor: [
        { path: '/distributor/dashboard', label: 'Dashboard', icon: HiHome },
        { path: '/distributor/available', label: 'Batch Tersedia', icon: HiInboxArrowDown },
        { path: '/distributor/distributions', label: 'Distribusi', icon: HiTruck },
    ],
    pembeli: [
        { path: '/buyer/marketplace', label: 'Marketplace', icon: HiShoppingCart },
        { path: '/buyer/orders', label: 'Pesanan', icon: HiClipboardDocumentList },
    ],
};

const Sidebar = () => {
    const { user } = useAuth();
    const menu = user ? menuMap[user.role] || [] : [];

    return (
        <div className="min-h-screen flex">
            <aside className="w-64 bg-white border-r border-surface-200 flex flex-col shrink-0">
                <div className="p-4 border-b border-surface-100">
                    <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Menu</p>
                </div>
                <nav className="flex-1 p-3 space-y-1">
                    {menu.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-800'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t border-surface-100">
                    <div className="flex items-center gap-2 px-3 py-2 bg-primary-50/50 rounded-lg">
                        <HiSparkles className="w-3.5 h-3.5 text-primary-500" />
                        <p className="text-[11px] text-primary-600 font-medium">AgriBatch v1.0</p>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-1 p-6 bg-surface-50 overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Sidebar;
