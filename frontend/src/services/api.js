// src/services/api.js
const API_BASE_URL = "http://localhost:8080";

// Função auxiliar para tratar erros de API
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || `Erro HTTP: ${response.status}`);
    }
    return response.json();
};

// Função auxiliar para fazer requisições
const apiRequest = async (url, options = {}) => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    });

    return handleResponse(response);
};

// Serviços de Cliente
export const clienteService = {
    async getAll() {
        return apiRequest('/clientes');
    },

    async getById(id) {
        return apiRequest(`/clientes/${id}`);
    },

    async create(cliente) {
        return apiRequest('/clientes', {
            method: 'POST',
            body: JSON.stringify(cliente),
        });
    },

    async update(id, cliente) {
        return apiRequest(`/clientes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(cliente),
        });
    },

    async delete(id) {
        const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erro ao excluir cliente');
        }
    },
};

// Serviços de Entrega
export const entregaService = {
    async getAll() {
        return apiRequest('/entregas');
    },

    async getById(id) {
        return apiRequest(`/entregas/${id}`);
    },

    async create(entrega) {
        return apiRequest('/entregas', {
            method: 'POST',
            body: JSON.stringify(entrega),
        });
    },

    async finalizar(id) {
        const response = await fetch(`${API_BASE_URL}/entregas/${id}/finalizacao`, {
            method: 'PUT',
        });
        if (!response.ok) {
            throw new Error('Erro ao finalizar entrega');
        }
    },
};

// Serviços de Ocorrência
export const ocorrenciaService = {
    async getByEntregaId(entregaId) {
        return apiRequest(`/entregas/${entregaId}/ocorrencias`);
    },

    async create(entregaId, descricao) {
        return apiRequest(`/entregas/${entregaId}/ocorrencias`, {
            method: 'POST',
            body: JSON.stringify({ descricao }),
        });
    },
};

const api = {
    cliente: clienteService,
    entrega: entregaService,
    ocorrencia: ocorrenciaService,
};

export default api;
