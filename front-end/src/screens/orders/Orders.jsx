import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:8080/bag", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } catch (err) {
                setError("Erro ao buscar as compras. Verifique o servidor.");
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Histórico de Compras</h1>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            {orders.length === 0 ? (
                <div className="text-center">
                    <p>Você ainda não realizou compras.</p>
                </div>
            ) : (
                <div className="row">
                    {orders.map((order) => (
                        <div className="col-md-6 mb-4" key={order.id}>
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Pedido #{order.id} - {order.orderStatus}
                                    </h5>
                                    <p>
                                        <strong>Data:</strong>{" "}
                                        {moment(order.moment).format("DD/MM/YYYY HH:mm:ss")}
                                    </p>
                                    <p>
                                        <strong>Total:</strong> ${order.total.toFixed(2)}
                                    </p>
                                    <div>
                                        <h6>Itens do Pedido:</h6>
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="mb-2">
                                                <p>
                                                    <strong>Produto:</strong> {item.product.name}
                                                </p>
                                                <p>
                                                    <strong>Quantidade:</strong> {item.quantity}
                                                </p>
                                                <p>
                                                    <strong>Subtotal:</strong> ${item.subTotal.toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
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

export default Orders;
