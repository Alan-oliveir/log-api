export const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR');
};

export const getStatusColor = (status) => {
    const colors = {
        PENDENTE: "bg-yellow-100 text-yellow-800",
        FINALIZADA: "bg-green-100 text-green-800",
        CANCELADA: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
};
