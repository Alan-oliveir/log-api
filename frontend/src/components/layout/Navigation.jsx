import { Users, Package, MapPin } from 'lucide-react';

const tabs = [
    { id: "clientes", label: "Clientes", icon: Users },
    { id: "entregas", label: "Entregas", icon: Package },
    { id: "dashboard", label: "Dashboard", icon: MapPin },
];

export const Navigation = ({ activeTab, onTabChange }) => (
    <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
                {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => onTabChange(id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === id
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        <Icon className="h-5 w-5" />
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </div>
    </nav>
);
