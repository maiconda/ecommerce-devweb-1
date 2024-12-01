# Projeto E-commerce

## Descrição Geral

O projeto é uma aplicação de e-commerce que permite a navegação, gerenciamento de carrinho e finalização de compras por usuários. Administradores possuem permissões adicionais para gerenciar produtos, categorias e outros administradores.

---

## Front-End

### Descrição
O front-end da aplicação foi desenvolvido com **React.js** e utiliza uma interface moderna, responsiva e dinâmica, implementando componentes reutilizáveis.

### Tecnologias Utilizadas
- **React.js**: Framework principal.
- **React Router DOM**: Gerenciamento de rotas e navegação.
- **Axios**: Requisições HTTP e integração com a API.
- **Bootstrap**: Framework CSS para responsividade.
- **Moment.js**: Formatação de datas e horários.
- **Local Storage**: Persistência de dados do usuário (autenticação, etc.).
- **Hooks do React**:
  - `useState`: Gerenciamento de estado.
  - `useEffect`: Efeitos colaterais (ex.: chamadas à API).
  - `useNavigate` e `useParams`: Navegação e parâmetros de rotas.

### Estrutura de Pastas
- `/src/components`: Componentes reutilizáveis, como Navbars.
- `/src/screens`: Páginas principais, como Login, Produtos, Carrinho, etc.
- `/src/styles`: Arquivos CSS adicionais.
- `/src/App.js`: Configuração principal de rotas e estado global.

### Funcionalidades
1. **Autenticação**
   - Login e logout com controle de sessão via `localStorage`.
   - Redirecionamento dinâmico para rotas específicas de ADMIN/USER.
2. **CRUD (Admin)**
   - Gerenciamento de produtos, categorias e administradores.
3. **Carrinho de Compras (User)**
   - Adição, visualização e compra de itens.
4. **Histórico de Compras (User)**
   - Listagem de pedidos realizados com detalhes e status.
5. **Responsividade**
   - Layout adaptado para dispositivos móveis, tablets e desktops.

### Configuração
1. **Instale as dependências:**
   ```bash
   npm install

2. **Inicie o Servidor de Desenvolvimento:**
   ```bash
   npm run dev

2. **Certifique-se de que o back-end está rodando**
