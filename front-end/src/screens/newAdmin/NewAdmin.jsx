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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "http://localhost:8080/users/newAdmin",
                admin,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
            });
        } catch (err) {
            setErrorMessage("Erro ao criar administrador. Verifique os dados ou o servidor.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Criar Novo Administrador</h1>
                            {successMessage && (
                                <div className="alert alert-success text-center">
                                    {successMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger text-center">
                                    {errorMessage}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        value={admin.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={admin.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        Telefone
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        className="form-control"
                                        value={admin.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Nome de Usuário
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="form-control"
                                        value={admin.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Senha
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        value={admin.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="img" className="form-label">
                                        URL da Imagem
                                    </label>
                                    <input
                                        type="text"
                                        id="img"
                                        name="img"
                                        className="form-control"
                                        value={admin.img}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Salvar Administrador
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewAdmin;
