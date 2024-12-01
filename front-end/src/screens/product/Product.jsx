import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Product = () => {
    const { id } = useParams(); // Extrai o ID da URL
    const [product, setProduct] = useState(null); // Estado para armazenar os detalhes do produto
    const [error, setError] = useState(null); // Estado para lidar com erros

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
    }, [id]); // Reexecuta quando o ID muda

    // Renderizando os detalhes do produto ou mensagem de erro
    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!product) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p><strong>Preço:</strong> ${product.price}</p>
            <p><strong>Descrição:</strong> {product.desciption}</p>
            <p>
                <strong>Categorias:</strong>{" "}
                {product.categories.map((category) => category.name).join(", ")}
            </p>
        </div>
    );
};

export default Product;
