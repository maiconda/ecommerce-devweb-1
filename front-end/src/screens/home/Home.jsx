import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]); // Estado para armazenar os produtos
    const [error, setError] = useState(null); // Estado para lidar com erros
    const navigate = useNavigate(); // Hook para redirecionar

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/products");
                setProducts(response.data);
            } catch (err) {
                setError("Erro ao buscar produtos. Verifique o servidor.");
            }
        };

        fetchProducts();
    }, []);

    // Função para navegar até a página do produto
    const handleViewProduct = (id) => {
        navigate(`/product/${id}`); // Redireciona para a página do produto pelo ID
    };

    return (
        <div>
            <h1>Lista de Produtos</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p><strong>Preço:</strong> ${product.price}</p>
                        <p><strong>Descrição:</strong> {product.desciption}</p>
                        <p>
                            <strong>Categorias:</strong>{" "}
                            {product.categories.map((category) => category.name).join(", ")}
                        </p>
                        <button onClick={() => handleViewProduct(product.id)}>
                            Ver Detalhes
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
