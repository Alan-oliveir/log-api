import { useState, useEffect } from 'react';
import { clienteService } from '../services/api';

export const useClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadClientes = async () => {
        try {
            setLoading(true);
            const data = await clienteService.getAll();
            setClientes(data);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClientes();
    }, []);

    const createCliente = async (cliente) => {
        const novo = await clienteService.create(cliente);
        setClientes(prev => [...prev, novo]);
        return novo;
    };

    const updateCliente = async (id, cliente) => {
        const atualizado = await clienteService.update(id, cliente);
        setClientes(prev => prev.map(c => c.id === id ? atualizado : c));
        return atualizado;
    };

    const deleteCliente = async (id) => {
        await clienteService.delete(id);
        setClientes(prev => prev.filter(c => c.id !== id));
    };

    return {
        clientes,
        loading,
        createCliente,
        updateCliente,
        deleteCliente,
        loadClientes
    };
};
