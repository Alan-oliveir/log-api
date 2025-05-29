import { useState } from 'react';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { useClientes } from '../hooks/useClientes';
import { Button } from '../components/common/Button';
import { ClienteForm } from '../components/forms/ClienteForm';

export const ClientesPage = ({ showError, showSuccess }) => {
    const { clientes, loading, createCliente, updateCliente, deleteCliente } = useClientes();
    const [showForm, setShowForm] = useState(false);
    const [editingCliente, setEditingCliente] = useState(null);

    const handleSubmit = async (formData) => {
        try {
            if (editingCliente) {
                await updateCliente(editingCliente.id, formData);
                showSuccess("Cliente atualizado com sucesso!");
            } else {
                await createCliente(formData);
                showSuccess("Cliente criado com sucesso!");
            }
            setShowForm(false);
            setEditingCliente(null);
        } catch (error) {
            showError(error.message);
        }
    };

    const handleEdit = (cliente) => {
        setEditingCliente(cliente);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Tem certeza que deseja excluir este cliente?")) return;

        try {
            await deleteCliente(id);
            showSuccess("Cliente excluído com sucesso!");
        } catch (error) {
            showError(error.message);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gestão de Clientes</h2>
                <Button
                    icon={Plus}
                    onClick={() => {
                        setShowForm(true);
                        setEditingCliente(null);
                    }}
                >
                    Novo Cliente
                </Button>
            </div>

            {showForm && (
                <ClienteForm
                    cliente={editingCliente}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingCliente(null);
                    }}
                    loading={loading}
                />
            )}

            <div className="bg-white shadow rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.telefone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleEdit(cliente)} className="text-blue-600 hover:text-blue-900">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleDelete(cliente.id)} className="text-red-600 hover:text-red-900">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {clientes.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum cliente</h3>
                        <p className="mt-1 text-sm text-gray-500">Comece criando um novo cliente.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
