import { useState } from 'react';
import { Plus, Eye, Package } from 'lucide-react';
import { useEntregas } from '../hooks/useEntregas';
import { clienteService, ocorrenciaService } from '../services/api';
import { formatDate } from '../utils/formatters';
import { StatusEntrega } from '../utils/constants';

export const EntregasPage = ({ showError, showSuccess }) => {
    const { entregas, loading, createEntrega, finalizarEntrega } = useEntregas();
    const [clientes, setClientes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showOcorrencias, setShowOcorrencias] = useState(null);
    const [ocorrencias, setOcorrencias] = useState([]);
    const [novaOcorrencia, setNovaOcorrencia] = useState('');
    const [formData, setFormData] = useState({
        cliente: { id: '' },
        destinatario: {
            nome: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
        },
        taxa: '',
    });

    // Carrega clientes uma única vez
    useState(() => {
        clienteService.getAll().then(setClientes).catch((e) => showError(e.message));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEntrega(formData);
            showSuccess('Entrega criada com sucesso!');
            setFormData({
                cliente: { id: '' },
                destinatario: {
                    nome: '',
                    logradouro: '',
                    numero: '',
                    complemento: '',
                    bairro: '',
                },
                taxa: '',
            });
            setShowForm(false);
        } catch (error) {
            showError(error.message);
        }
    };

    const handleFinalizar = async (id) => {
        if (!confirm('Finalizar entrega?')) return;
        try {
            await finalizarEntrega(id);
            showSuccess('Entrega finalizada com sucesso!');
        } catch (error) {
            showError(error.message);
        }
    };

    const loadOcorrencias = async (entregaId) => {
        try {
            const data = await ocorrenciaService.getByEntregaId(entregaId);
            setOcorrencias(data);
            setShowOcorrencias(entregaId);
        } catch (error) {
            showError(error.message);
        }
    };

    const handleAddOcorrencia = async (entregaId) => {
        if (!novaOcorrencia.trim()) return;
        try {
            await ocorrenciaService.create(entregaId, novaOcorrencia);
            showSuccess('Ocorrência registrada!');
            setNovaOcorrencia('');
            loadOcorrencias(entregaId);
        } catch (error) {
            showError(error.message);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            [StatusEntrega.PENDENTE]: "bg-yellow-100 text-yellow-800",
            [StatusEntrega.FINALIZADA]: "bg-green-100 text-green-800",
            [StatusEntrega.CANCELADA]: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gestão de Entregas</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                >
                    <Plus className="h-4 w-4" />
                    <span>Nova Entrega</span>
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select
                            required
                            value={formData.cliente.id}
                            onChange={(e) => setFormData({ ...formData, cliente: { id: parseInt(e.target.value) } })}
                            className="border rounded px-3 py-2"
                        >
                            <option value="">Selecione o cliente</option>
                            {clientes.map(c => (
                                <option key={c.id} value={c.id}>{c.nome}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Taxa (R$)"
                            required
                            value={formData.taxa}
                            onChange={(e) => setFormData({ ...formData, taxa: parseFloat(e.target.value) })}
                            className="border rounded px-3 py-2"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["nome", "logradouro", "numero", "complemento", "bairro"].map((field) => (
                            <input
                                key={field}
                                type="text"
                                placeholder={field}
                                required={field !== "complemento"}
                                value={formData.destinatario[field]}
                                onChange={(e) =>
                                    setFormData({ ...formData, destinatario: { ...formData.destinatario, [field]: e.target.value } })
                                }
                                className="border rounded px-3 py-2"
                            />
                        ))}
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Criar
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            {/* Lista */}
            <div className="bg-white rounded shadow divide-y">
                {entregas.map((entrega) => (
                    <div key={entrega.id} className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-lg">Entrega #{entrega.id}</h4>
                                <p className="text-sm text-gray-500">Cliente: {entrega.cliente.nome}</p>
                            </div>
                            <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(entrega.status)}`}>
                  {entrega.status}
                </span>
                                <button onClick={() => loadOcorrencias(entrega.id)} className="text-blue-600 hover:underline">
                                    <Eye className="h-4 w-4" />
                                </button>
                                {entrega.status === StatusEntrega.PENDENTE && (
                                    <button
                                        onClick={() => handleFinalizar(entrega.id)}
                                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                    >
                                        Finalizar
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="mt-2 text-sm text-gray-600">
                            <p><strong>Taxa:</strong> R$ {entrega.taxa.toFixed(2)}</p>
                            <p><strong>Data do Pedido:</strong> {formatDate(entrega.dataPedido)}</p>
                            {entrega.dataFinalizacao && (
                                <p><strong>Finalizado em:</strong> {formatDate(entrega.dataFinalizacao)}</p>
                            )}
                            <p><strong>Destinatário:</strong> {entrega.destinatario.nome}, {entrega.destinatario.logradouro}, {entrega.destinatario.numero} - {entrega.destinatario.bairro}</p>
                        </div>

                        {showOcorrencias === entrega.id && (
                            <div className="mt-4 border-t pt-4">
                                <h5 className="font-semibold mb-2">Ocorrências</h5>

                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        placeholder="Descreva a ocorrência"
                                        value={novaOcorrencia}
                                        onChange={(e) => setNovaOcorrencia(e.target.value)}
                                        className="flex-1 border rounded px-3 py-2"
                                    />
                                    <button onClick={() => handleAddOcorrencia(entrega.id)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                        Adicionar
                                    </button>
                                </div>

                                {ocorrencias.length > 0 ? (
                                    <ul className="space-y-2">
                                        {ocorrencias.map((oc) => (
                                            <li key={oc.id} className="bg-gray-100 p-2 rounded">
                                                <p>{oc.descricao}</p>
                                                <p className="text-xs text-gray-500">{formatDate(oc.dataRegistro)}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="italic text-sm text-gray-500">Nenhuma ocorrência registrada.</p>
                                )}

                                <button onClick={() => setShowOcorrencias(null)} className="mt-3 text-sm text-gray-600 hover:underline">
                                    Fechar
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {entregas.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-900">Nenhuma entrega encontrada.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
