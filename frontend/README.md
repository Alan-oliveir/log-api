
# 🎯 WorksLog Frontend - React

Este é o frontend do sistema **WorksLog**, desenvolvido com **React + Tailwind CSS**, responsável pela interface de gerenciamento de clientes, entregas e ocorrências.

---

## 🚀 Como Rodar

### Pré-requisitos:
- Node.js 16+
- Backend rodando em `http://localhost:8080`

### Passos:

```bash
# 1. Acesse a pasta frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Rode o projeto
npm start
```

O frontend será aberto automaticamente em `http://localhost:3000`.

---

## 🧱 Estrutura de Diretórios

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── forms/
│   │   └── layout/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

---

## ✅ Funcionalidades

- Cadastro e edição de **clientes**
- Registro de **entregas** com destinatário e taxa
- Adição e visualização de **ocorrências**
- **Finalização de entrega**
- **Dashboard** com estatísticas
- Componentes reutilizáveis e layout limpo com Tailwind CSS

---

## 🛠️ Tecnologias

- React 18+
- Tailwind CSS
- Lucide Icons
- Hooks personalizados
- Fetch API
- Componentização modular

---

## 📦 Build para produção

```bash
npm run build
```

Os arquivos finais estarão em `frontend/build/`. Em produção, podem ser copiados para `src/main/resources/static/` no projeto Spring Boot.

---

## 👨‍💻 Autor

Desenvolvido por [Alan de O. Gonçalves](https://github.com/Alan-oliveir)
