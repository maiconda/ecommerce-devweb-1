# Back-End - Projeto E-commerce

## Descrição
O back-end foi desenvolvido utilizando **Spring Boot**, com uma API RESTful que gerencia recursos como usuários, produtos, categorias, carrinhos e pedidos. Oferece autenticação e autorização via **JWT** e integração com banco de dados **MySQL**.

---

## Tecnologias Utilizadas

- **Spring Boot**: Framework principal para construção de aplicações robustas.
- **Spring Security**: Gerenciamento de autenticação e autorização com suporte a JWT.
- **Hibernate**: ORM utilizado para mapear classes Java para tabelas do banco de dados.
- **MySQL**: Banco de dados relacional utilizado para persistência.
- **Lombok**: Redução de código boilerplate em classes.
- **Maven**: Gerenciamento de dependências e build.
- **JWT**: JSON Web Tokens para autenticação segura.

---

## Estrutura de Pastas

- **`/src/main/java/com/project/config`**:
  Configurações de segurança (CORS, autenticação via JWT).
- **`/src/main/java/com/project/controllers`**:
  Endpoints REST responsáveis por gerenciar usuários, produtos, categorias, pedidos e carrinhos.
- **`/src/main/java/com/project/entities`**:
  Classes que representam tabelas no banco de dados (ORM).
- **`/src/main/java/com/project/repositories`**:
  Interfaces para acesso ao banco de dados (Spring Data JPA).
- **`/src/main/java/com/project/services`**:
  Lógica de negócios, validações e manipulação de dados.

---

## Endpoints Principais

### **Autenticação**
- **POST `/login`**:
  - Autentica o usuário e retorna um JWT para autorização.
- **POST `/users/newAdmin`**:
  - Criação de um novo administrador.

### **Produtos**
- **GET `/products`**:
  - Retorna todos os produtos.
- **POST `/products`**:
  - Adiciona um novo produto (somente ADMIN).
- **GET `/products/{id}`**:
  - Retorna os detalhes de um produto específico.

### **Carrinho**
- **GET `/bag/bag_user`**:
  - Retorna os itens do carrinho do usuário logado.
- **POST `/bag/to_bag/{id}`**:
  - Adiciona um produto ao carrinho.

### **Pedidos**
- **GET `/bag`**:
  - Retorna o histórico de pedidos do usuário logado.
- **POST `/bag`**:
  - Finaliza a compra de um carrinho.

---

### Configuração do Projeto
1. **Configure as credenciais no arquivo application.properties:**
  spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
  spring.datasource.username=seu_usuario
  spring.datasource.password=sua_senha
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.show-sql=true
  spring.security.jwt.secret=seu_segredo_jwt


2. **Compile o projeto:**
  mvn clean install

3. **Execute o servidor:**
  mvn spring-boot:run

4. **O back-end estará disponível em: http://localhost:8080.**
=======
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
