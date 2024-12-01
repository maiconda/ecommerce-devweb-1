import React, { useState } from "react";
import axios from "axios";

const NewCategory = () => {
    const [category, setCategory] = useState({
        name: "",
        image: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Atualiza os valores dos campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    // Envia os dados da nova categoria
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token"); // Obtém o token do localStorage

        try {
            const response = await axios.post(
                "http://localhost:8080/categories", // Endpoint para criação de categorias
                category,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
                    },
                }
            );

            setSuccessMessage("Categoria criada com sucesso!");
            setErrorMessage("");
            setCategory({
                name: "",
                image: "",
            }); // Reseta o formulário
        } catch (err) {
            setErrorMessage("Erro ao criar categoria. Verifique os dados ou o servidor.");
            setSuccessMessage("");
        }
    };

    return (
        <div>
            <h1>Criar Nova Categoria</h1>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Imagem:</label>
                    <input
                        type="text"
                        name="image"
                        value={category.image}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Salvar Categoria</button>
            </form>
        </div>
    );
};

export default NewCategory;
