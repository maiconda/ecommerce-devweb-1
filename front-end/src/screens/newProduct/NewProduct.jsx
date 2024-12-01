import React, { useState } from "react";
import axios from "axios";

const NewProduct = () => {
    const [product, setProduct] = useState({
        id: null,
        name: "",
        desciption: "",
        price: "",
        imgUrl: "",
    }); // Estado inicial para o formulário

    const [successMessage, setSuccessMessage] = useState(""); // Mensagem de sucesso
    const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro

    // Atualiza os valores dos campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Envia o produto via POST
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita o reload da página
        const token = localStorage.getItem("token"); 
        try {
            console.log(token)
            const response = await axios.post("http://localhost:8080/products", product            ,{
                headers: {
                    Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
                },
            });
            setSuccessMessage("Produto criado com sucesso!"); // Define mensagem de sucesso
            setErrorMessage(""); // Reseta mensagens de erro
            setProduct({ id: null, name: "", desciption: "", price: "", imgUrl: "" }); // Reseta o formulário
        } catch (err) {
            setErrorMessage("Erro ao criar produto. Verifique os dados ou o servidor."); // Define mensagem de erro
            setSuccessMessage(""); // Reseta mensagem de sucesso
        }
    };

    return (
        <div>
            <h1>Criar Novo Produto</h1>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        name="desciption"
                        value={product.desciption}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>URL da Imagem:</label>
                    <input
                        type="text"
                        name="imgUrl"
                        value={product.imgUrl}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Salvar Produto</button>
            </form>
        </div>
    );
};

export default NewProduct;
