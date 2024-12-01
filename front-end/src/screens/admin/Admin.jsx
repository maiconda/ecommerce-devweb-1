import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token"); // Obtém o token do localStorage
            const headers = { Authorization: `Bearer ${token}` };

            try {
                // Fazendo múltiplas requisições
                const [usersResponse, productsResponse, categoriesResponse] = await Promise.all([
                    axios.get("http://localhost:8080/users", { headers }), // Endpoint para usuários
                    axios.get("http://localhost:8080/products", { headers }), // Endpoint para produtos
                    axios.get("http://localhost:8080/categories", { headers }), // Endpoint para categorias
                ]);

                setUsers(usersResponse.data);
                setProducts(productsResponse.data);
                setCategories(categoriesResponse.data);
            } catch (err) {
                setError("Erro ao carregar os dados. Verifique o servidor.");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>Painel do Administrador</h1>
            {error && <p className="error-message">{error}</p>}

            <div className="table-container">
                <h2>Usuários</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="table-container">
                <h2>Produtos</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                            {/* <th>Categorias</th> */}
                            <th>Imagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.desciption}</td>
                                {/* <td>{product.categories[0].name}</td> */}
                                <td>{product.imgUrl}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="table-container">
                <h2>Categorias</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>URL da Imagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.image}</td> {/* Mostra a URL da imagem */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
