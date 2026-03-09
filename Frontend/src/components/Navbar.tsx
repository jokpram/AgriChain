import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const roleLabels: Record<string, string> = {
        admin: 'Administrator',
        petani: 'Petani',
        distributor: 'Distributor',
        pembeli: 'Pembeli'
    };

    const roleBadgeColors: Record<string, string> = {
        admin: 'bg-red-100 text-red-700',
        petani: 'bg-primary-100 text-primary-700',
        distributor: 'bg-blue-100 text-blue-700',
        pembeli: 'bg-amber-100 text-amber-700'
    };

    return (
        <nav className="bg-white border-b border-surface-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <div className="flex items-center justify-between h-16 px-6">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-sm">AB</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-surface-800 leading-tight">AgriBatch</h1>
                        <p className="text-[10px] text-surface-400 leading-tight tracking-wider uppercase">Traceability System</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {user && (
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-surface-700">{user.name}</p>
                                <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${roleBadgeColors[user.role] || 'bg-surface-100 text-surface-600'}`}>
                                    {roleLabels[user.role] || user.role}
                                </span>
                            </div>
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-white font-semibold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="ml-2 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-surface-600 bg-surface-100 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                            >
                                <HiArrowRightOnRectangle className="w-3.5 h-3.5" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
