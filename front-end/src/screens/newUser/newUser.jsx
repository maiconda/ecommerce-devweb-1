import React, { useState } from "react";
import axios from "axios";

const NewUser = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Atualiza os valores dos campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Envia os dados do novo administrador
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/users", // Endpoint para criação de administradores
                user,
            );

            setSuccessMessage("Administrador criado com sucesso!");
            setErrorMessage("");
            setUser({
                name: "",
                email: "",
                phone: "",
                username: "",
                password: "",
            });
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
                        value={user.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Nome de Usuário:</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Salvar Administrador</button>
            </form>
        </div>
    );
};

export default NewUser;
