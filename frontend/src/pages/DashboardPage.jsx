import { useEffect, useState } from 'react';
import { clienteService, entregaService } from '../services/api';
import { Users, Package, Calendar, CheckCircle } from 'lucide-react';
import { StatusEntrega } from '../utils/constants';

export const DashboardPage = ({ showError }) => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalClientes: 0,
        totalEntregas: 0,
        entregasPendentes: 0,
        entregasFinalizadas: 0,
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [clientes, entregas] = await Promise.all([
                    clienteService.getAll(),
                    entregaService.getAll(),
                ]);

                setStats({
                    totalClientes: clientes.length,
                    totalEntregas: entregas.length,
                    entregasPendentes: entregas.filter((e) => e.status === StatusEntrega.PENDENTE).length,
                    entregasFinalizadas: entregas.filter((e) => e.status === StatusEntrega.FINALIZADA).length,
                });
            } catch (error) {
                showError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, [showError]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                    icon={<Users className="h-6 w-6 text-blue-500" />}
                    label="Total de Clientes"
                    value={stats.totalClientes}
                />
                <DashboardCard
                    icon={<Package className="h-6 w-6 text-purple-500" />}
                    label="Total de Entregas"
                    value={stats.totalEntregas}
                />
                <DashboardCard
                    icon={<Calendar className="h-6 w-6 text-yellow-500" />}
                    label="Entregas Pendentes"
                    value={stats.entregasPendentes}
                />
                <DashboardCard
                    icon={<CheckCircle className="h-6 w-6 text-green-500" />}
                    label="Entregas Finalizadas"
                    value={stats.entregasFinalizadas}
                />
            </div>
        </div>
    );
};

const DashboardCard = ({ icon, label, value }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg p-5 flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-5">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>
    </div>
);
