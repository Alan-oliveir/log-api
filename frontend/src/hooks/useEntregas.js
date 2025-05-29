import { useState, useEffect } from 'react';
import { entregaService } from '../services/api';

export const useEntregas = () => {
    const [entregas, setEntregas] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadEntregas = async () => {
        try {
            setLoading(true);
            const data = await entregaService.getAll();
            setEntregas(data);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEntregas();
    }, []);

    const createEntrega = async (entrega) => {
        const nova = await entregaService.create(entrega);
        setEntregas(prev => [...prev, nova]);
        return nova;
    };

    const finalizarEntrega = async (id) => {
        await entregaService.finalizar(id);
        await loadEntregas(); // atualiza lista após finalização
    };

    return {
        entregas,
        loading,
        createEntrega,
        finalizarEntrega,
        loadEntregas
    };
};
