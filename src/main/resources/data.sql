-- CLIENTES
INSERT INTO cliente (id, nome, email, fone) VALUES (1, 'João Silva', 'joao@email.com', '11999999999');
INSERT INTO cliente (id, nome, email, fone) VALUES (2, 'Maria Souza', 'maria@email.com', '11888888888');

-- ENTREGA (status = 'PENDENTE' precisa existir no enum StatusEntrega)
INSERT INTO entrega (
    id, cliente_id, taxa, status, data_pedido,
    destinatario_nome, destinatario_logradouro, destinatario_numero,
    destinatario_complemento, destinatario_bairro
) VALUES (
             1, 1, 15.00, 'PENDENTE', CURRENT_TIMESTAMP,
             'Carlos Lima', 'Rua A', '123', 'Apto 45', 'Centro'
         );

-- OCORRÊNCIA
INSERT INTO ocorrencia (id, entrega_id, descricao, data_registro)
VALUES (1, 1, 'Pacote saiu para entrega.', CURRENT_TIMESTAMP);
