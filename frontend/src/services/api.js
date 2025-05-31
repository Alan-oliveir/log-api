const API_BASE_URL = 'http://localhost:8080';

// Função genérica para tratar a resposta do fetch
const handleResponse = async (response) => {
    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
        let errorMsg = `Erro ${response.status}`;
        try {
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                errorMsg = data.message || JSON.stringify(data);
            } else {
                errorMsg = await response.text();
            }
        } catch (_) {
            // fallback
        }
        throw new Error(errorMsg);
    }

    // Tenta parsear JSON se o header indicar JSON
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    }

    return response.text();
};

// Requisição genérica com headers padrão
const apiRequest = async (url, options = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json', // Força JSON na resposta
    };

    const finalOptions = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    const response = await fetch(`${API_BASE_URL}${url}`, finalOptions);
    return handleResponse(response);
};

// CRUD de clientes
export const clienteService = {
    getAll: () => apiRequest('/clientes'),
    getById: (id) => apiRequest(`/clientes/${id}`),
    create: (data) => apiRequest('/clientes', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id, data) => apiRequest(`/clientes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id) => apiRequest(`/clientes/${id}`, {
        method: 'DELETE',
    }),
};

// Entregas
export const entregaService = {
    getAll: () => apiRequest('/entregas'),
    getById: (id) => apiRequest(`/entregas/${id}`),
    create: (data) => apiRequest('/entregas', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    finalizar: (id) => apiRequest(`/entregas/${id}/finalizacao`, {
        method: 'PUT',
    }),
};

// Ocorrências
export const ocorrenciaService = {
    getByEntregaId: (entregaId) => apiRequest(`/entregas/${entregaId}/ocorrencias`),
    create: (entregaId, descricao) => apiRequest(`/entregas/${entregaId}/ocorrencias`, {
        method: 'POST',
        body: JSON.stringify({ descricao }),
    }),
};

// Exporta todos os serviços agrupados se quiser usar como `api.entrega.getAll()` etc.
const api = {
    cliente: clienteService,
    entrega: entregaService,
    ocorrencia: ocorrenciaService,
};

export default api;
