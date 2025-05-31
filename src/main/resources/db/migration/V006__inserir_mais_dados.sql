
-- V6__inserir_mais_dados.sql

-- NOVOS CLIENTES
INSERT INTO cliente (id, nome, email, fone) VALUES
(3, 'Carlos Almeida', 'carlos@email.com', '11777777777'),
(4, 'Beatriz Ramos', 'beatriz@email.com', '11666666666');

-- NOVAS ENTREGAS
INSERT INTO entrega (
  id, cliente_id, taxa, status, data_pedido,
  destinatario_nome, destinatario_logradouro, destinatario_numero,
  destinatario_complemento, destinatario_bairro
) VALUES 
(2, 2, 20.50, 'PENDENTE', CURRENT_TIMESTAMP,
  'Bruno Silva', 'Rua B', '456', 'Casa', 'Jardim'),
(3, 3, 12.00, 'FINALIZADA', CURRENT_TIMESTAMP,
  'Ana Melo', 'Av. Central', '789', 'Bloco C', 'Centro');

-- NOVAS OCORRÊNCIAS
INSERT INTO ocorrencia (id, entrega_id, descricao, data_registro)
VALUES
(2, 2, 'Encomenda em trânsito.', CURRENT_TIMESTAMP),
(3, 3, 'Entrega finalizada com sucesso.', CURRENT_TIMESTAMP);
