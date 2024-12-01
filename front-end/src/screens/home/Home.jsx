import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const handleViewProduct = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Lista de Produtos</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={product.imgUrl || "https://via.placeholder.com/150"}
                                className="card-img-top"
                                alt={product.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">
                                    <strong>Preço:</strong> ${product.price}
                                </p>
                                <p className="card-text">
                                    <strong>Descrição:</strong> {product.desciption}
                                </p>
                                <p className="card-text">
                                    <strong>Categorias:</strong>{" "}
                                    {product.categories
                                        .map((category) => category.name)
                                        .join(", ")}
                                </p>
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={() => handleViewProduct(product.id)}
                                >
                                    Ver Detalhes
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
