
-- V5__inserir_dados_iniciais.sql

-- INSERIR CLIENTES
INSERT INTO cliente (id, nome, email, fone) VALUES
(1, 'João Silva', 'joao@email.com', '11999999999'),
(2, 'Maria Souza', 'maria@email.com', '11888888888');

-- INSERIR ENTREGA
INSERT INTO entrega (
  id, cliente_id, taxa, status, data_pedido,
  destinatario_nome, destinatario_logradouro, destinatario_numero,
  destinatario_complemento, destinatario_bairro
) VALUES (
  1, 1, 15.00, 'PENDENTE', CURRENT_TIMESTAMP,
  'Carlos Lima', 'Rua A', '123', 'Apto 45', 'Centro'
);

-- INSERIR OCORRÊNCIA
INSERT INTO ocorrencia (id, entrega_id, descricao, data_registro)
VALUES (1, 1, 'Pedido recebido pelo entregador.', CURRENT_TIMESTAMP);
