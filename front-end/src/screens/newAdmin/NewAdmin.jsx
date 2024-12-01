import React, { useState } from "react";
import axios from "axios";

const NewAdmin = () => {
    const [admin, setAdmin] = useState({
        name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        img: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Atualiza os valores dos campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    };

    // Envia os dados do novo administrador
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token"); // Obtém o token do localStorage

        try {
            console.log(token)
            const response = await axios.post(
                "http://localhost:8080/users/newAdmin", // Endpoint para criação de administradores
                admin,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
                    },
                }
            );

            setSuccessMessage("Administrador criado com sucesso!");
            setErrorMessage("");
            setAdmin({
                name: "",
                email: "",
                phone: "",
                username: "",
                password: "",
                img: "",
            }); // Reseta o formulário
        } catch (err) {
            setErrorMessage("Erro ao criar administrador. Verifique os dados ou o servidor.");
            setSuccessMessage("");
        }
    };

    return (
        <div>
            <h1>Criar Novo Administrador</h1>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="name"
                        value={admin.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={admin.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={admin.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Nome de Usuário:</label>
                    <input
                        type="text"
                        name="username"
                        value={admin.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        name="password"
                        value={admin.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>URL da Imagem:</label>
                    <input
                        type="text"
                        name="img"
                        value={admin.img}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Salvar Administrador</button>
            </form>
        </div>
    );
};

export default NewAdmin;
