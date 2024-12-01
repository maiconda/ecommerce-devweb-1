import React, { useState } from "react";
import axios from "axios";

const NewCategory = () => {
    const [category, setCategory] = useState({
        name: "",
        image: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "http://localhost:8080/categories",
                category,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccessMessage("Categoria criada com sucesso!");
            setErrorMessage("");
            setCategory({
                name: "",
                image: "",
            });
        } catch (err) {
            setErrorMessage("Erro ao criar categoria. Verifique os dados ou o servidor.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Criar Nova Categoria</h1>
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
                                        value={category.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        URL da Imagem
                                    </label>
                                    <input
                                        type="text"
                                        id="image"
                                        name="image"
                                        className="form-control"
                                        value={category.image}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Salvar Categoria
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

export default NewCategory;
