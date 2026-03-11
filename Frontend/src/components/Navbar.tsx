import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useThrottle } from '../hooks/useThrottle';
import { useToast } from '../hooks/useToast';
import { HiArrowRightOnRectangle, HiUserCircle, HiBars3 } from 'react-icons/hi2';
import { FaLeaf } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface NavbarProps {
    onMenuToggle?: () => void;
}

const Navbar = ({ onMenuToggle }: NavbarProps) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { showConfirm } = useToast();

    const handleLogout = useThrottle(() => {
        showConfirm("Apakah Anda yakin ingin keluar dari AgriChain?", () => {
            logout();
            navigate('/login');
        });
    }, 1500);

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
        <nav className="bg-white border-b border-surface-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
                <div className="flex items-center gap-3 md:gap-4">
                    <button
                        onClick={onMenuToggle}
                        className="lg:hidden p-2 -ml-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        <HiBars3 className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-sm">
                            <FaLeaf className="w-4 h-4 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-lg font-bold text-surface-800 leading-tight font-mono tracking-tight">AgriChain</h1>
                            <p className="text-[10px] text-surface-400 leading-tight tracking-wider uppercase">Traceability System</p>
                        </div>
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

                            <div className="flex bg-surface-100 rounded-lg p-0.5 ml-2">
                                <Link
                                    to={`/${user.role}/profile`}
                                    title="Pengaturan Profil"
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-surface-600 hover:bg-white hover:text-primary-600 hover:shadow-sm rounded-md transition-all duration-200"
                                >
                                    <HiUserCircle className="w-4 h-4" />
                                    <span className="hidden sm:inline">Profil</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    title="Keluar"
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-surface-600 hover:bg-white hover:text-red-600 hover:shadow-sm rounded-md transition-all duration-200"
                                >
                                    <HiArrowRightOnRectangle className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
