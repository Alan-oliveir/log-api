# Projeto WorksLog - API REST com Spring Boot

Este projeto foi desenvolvido durante o curso **Mergulho Spring REST** da [AlgaWorks](https://www.algaworks.com/), com foco na construção de APIs REST profissionais usando **Java e Spring Boot**.  
O objetivo é registrar clientes e controlar entregas, com operações CRUD e endpoints para finalização e ocorrências.

---

## Tecnologias e Conceitos Aplicados

- Spring Boot
- Spring Web
- Spring Data JPA
- Bean Validation
- Content Negotiation
- Exception Handler global
- ModelMapper
- Flyway (migrações de banco de dados)
- H2 (banco em memória para testes)
- MySQL (compatível)
- Testes com Postman

---

## Estrutura do Projeto

```
log-api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/works/log/api/  # Código Java da API
│   │   └── resources/
│   │       ├── application.properties
│   │       └── db/migration/       # Scripts Flyway
├── frontend/                       # Aplicação React para testes (opcional)
```

---

## Funcionalidades da API

- ✅ CRUD completo de **clientes** (`/clientes`)
- ✅ Cadastro e listagem de **entregas** (`/entregas`)
- ✅ Registro de **ocorrências** (`/entregas/{id}/ocorrencias`)
- ✅ Finalização de entrega (`PUT /entregas/{id}/finalizacao`)

---

## Como executar o projeto

### Pré-requisitos
- Java 17+
- Maven

### Comandos

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/log-api.git
cd log-api

# Rodar o backend
./mvnw spring-boot:run
```

> Por padrão, o banco H2 será iniciado e populado com dados de teste via Flyway.

---

## Frontend (opcional)

Há um frontend em React na pasta `frontend/`, usado apenas para testes de interface e consumo da API.

```bash
cd frontend
npm install
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## Modelo de Domínio

![Modelo conceitual](https://github.com/Alan-oliveir/log-api/blob/main/images/modelo_conceitual_workslog.png)

---

## Exemplo de Requisições (Postman)

![Imagem do Postman](https://github.com/Alan-oliveir/log-api/blob/main/images/img-workslog-clientes-list.png)

---

## Agradecimentos e Créditos

Este projeto foi desenvolvido com base no treinamento oferecido pela [AlgaWorks](https://www.algaworks.com/).

---
