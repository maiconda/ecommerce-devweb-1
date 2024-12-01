import React, { useState } from "react";
import axios from "axios";

const NewProduct = () => {
    const [product, setProduct] = useState({
        id: null,
        name: "",
        desciption: "",
        price: "",
        imgUrl: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                "http://localhost:8080/products",
                product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage("Produto criado com sucesso!");
            setErrorMessage("");
            setProduct({ id: null, name: "", desciption: "", price: "", imgUrl: "" }); 
        } catch (err) {
            setErrorMessage("Erro ao criar produto. Verifique os dados ou o servidor."); 
            setSuccessMessage("");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Criar Novo Produto</h1>
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
                                        value={product.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desciption" className="form-label">
                                        Descrição
                                    </label>
                                    <textarea
                                        id="desciption"
                                        name="desciption"
                                        className="form-control"
                                        rows="3"
                                        value={product.desciption}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">
                                        Preço
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        className="form-control"
                                        value={product.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imgUrl" className="form-label">
                                        URL da Imagem
                                    </label>
                                    <input
                                        type="text"
                                        id="imgUrl"
                                        name="imgUrl"
                                        className="form-control"
                                        value={product.imgUrl}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Salvar Produto
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

export default NewProduct;
