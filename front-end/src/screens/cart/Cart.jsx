import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
    const [bags, setBags] = useState([]); 
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(""); 

    useEffect(() => {
        const fetchBags = async () => {
            const token = localStorage.getItem("token"); 
            try {
                const response = await axios.get("http://localhost:8080/bag/user_bags", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBags(response.data);
            } catch (err) {
                setError("Erro ao buscar o carrinho. Verifique o servidor.");
            }
        };

        fetchBags();
    }, []);

    const handleBuyBag = async (id) => {
        const token = localStorage.getItem("token"); 
        try {
            await axios.post(
                "http://localhost:8080/bag",
                { id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage("Compra realizada com sucesso!");
            setError(null);

            setBags(bags.filter((bag) => bag.id !== id));
        } catch (err) {
            setError("Erro ao realizar a compra. Verifique o servidor.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Carrinho de Compras</h1>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            {successMessage && (
                <div className="alert alert-success text-center">{successMessage}</div>
            )}
            {bags.length === 0 ? (
                <div className="text-center">
                    <p>Seu carrinho está vazio.</p>
                </div>
            ) : (
                <div className="row">
                    {bags.map((bag) => (
                        <div className="col-md-6 mb-4" key={bag.id}>
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5 className="card-title">ID da Bag: {bag.id}</h5>
                                    <p>
                                        <strong>Quantidade:</strong> {bag.quantity}
                                    </p>
                                    <p>
                                        <strong>Preço:</strong> ${bag.price.toFixed(2)}
                                    </p>
                                    <div className="d-grid">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleBuyBag(bag.id)}
                                        >
                                            Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
