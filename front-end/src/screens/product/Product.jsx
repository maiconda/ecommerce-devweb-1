import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError("Erro ao buscar o produto. Verifique o servidor.");
            }
        };

        fetchProduct();
    }, [id]);

    const addToBag = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                `http://localhost:8080/bag/to_bag/${id}`,
                { quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage("Produto adicionado ao carrinho com sucesso!");
        } catch (err) {
            setError("Erro ao adicionar o produto ao carrinho. Verifique o servidor.");
        }
    };

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger text-center">{error}</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mt-5 text-center">
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center mb-4">{product.name}</h1>
                            <p className="text-center">
                                <strong>Preço:</strong> ${product.price}
                            </p>
                            <p>
                                <strong>Descrição:</strong> {product.desciption}
                            </p>
                            <p>
                                <strong>Categorias:</strong>{" "}
                                {product.categories.map((category) => category.name).join(", ")}
                            </p>
                            {product.imgUrl && (
                                <div className="text-center mb-4">
                                    <img
                                        src={product.imgUrl}
                                        alt={product.name}
                                        className="img-fluid rounded"
                                    />
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">
                                    Quantidade
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className="form-control"
                                    value={quantity}
                                    min="1"
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                />
                            </div>
                            <div className="d-grid">
                                <button
                                    className="btn btn-primary"
                                    onClick={addToBag}
                                >
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                            {successMessage && (
                                <div className="alert alert-success mt-3 text-center">
                                    {successMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
