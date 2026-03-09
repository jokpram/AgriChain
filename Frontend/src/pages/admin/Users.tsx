import { useEffect, useState } from 'react';
import api from '../../services/api';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [filter]);

    const fetchUsers = async () => {
        try {
            const params = filter ? `?role=${filter}` : '';
            const res = await api.get(`/admin/users${params}`);
            setUsers(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id: number, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
            await api.patch(`/admin/users/${id}/status`, { status: newStatus });
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    const roleBadge: Record<string, string> = {
        petani: 'bg-green-100 text-green-700',
        distributor: 'bg-blue-100 text-blue-700',
        pembeli: 'bg-amber-100 text-amber-700',
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-800">Manajemen Users</h1>
                    <p className="text-surface-500 text-sm mt-1">Kelola semua user dalam sistem</p>
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                >
                    <option value="">Semua Role</option>
                    <option value="petani">Petani</option>
                    <option value="distributor">Distributor</option>
                    <option value="pembeli">Pembeli</option>
                </select>
            </div>

            <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-surface-50 border-b border-surface-200">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Nama</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Email</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Role</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Status</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Tanggal</th>
                                <th className="text-right px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-surface-100 hover:bg-surface-50 transition-colors">
                                    <td className="px-5 py-3.5 text-sm font-medium text-surface-800">{user.name}</td>
                                    <td className="px-5 py-3.5 text-sm text-surface-600">{user.email}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleBadge[user.role] || 'bg-surface-100 text-surface-600'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                            {user.status === 'active' ? 'Aktif' : 'Suspended'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-sm text-surface-500">
                                        {new Date(user.created_at).toLocaleDateString('id-ID')}
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <button
                                            onClick={() => toggleStatus(user.id, user.status)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${user.status === 'active'
                                                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                                                }`}
                                        >
                                            {user.status === 'active' ? 'Suspend' : 'Aktifkan'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr><td colSpan={6} className="px-5 py-10 text-center text-surface-400 text-sm">Tidak ada user ditemukan</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Users;
