import { Package } from 'lucide-react';

export const Header = () => (
    <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-3">
                    <Package className="h-8 w-8 text-blue-600" />
                    <h1 className="text-2xl font-bold text-gray-900">WorksLog</h1>
                </div>
                <p className="text-sm text-gray-600">Sistema de Gestão de Entregas</p>
            </div>
        </div>
    </header>
);
