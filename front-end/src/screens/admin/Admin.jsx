import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };

            try {
                const [usersResponse, productsResponse, categoriesResponse] = await Promise.all([
                    axios.get("http://localhost:8080/users", { headers }),
                    axios.get("http://localhost:8080/products", { headers }),
                    axios.get("http://localhost:8080/categories", { headers }), 
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
        <div className="container mt-5">
            <h1 className="text-center mb-5">Painel do Administrador</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-5">
                <h2>Usuários</h2>
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Permissoes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.roles[0].name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-5">
                <h2>Produtos</h2>
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Descrição</th>
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
                                <td>{product.imgUrl}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-5">
                <h2>Categorias</h2>
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
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
                                <td>{category.image}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
