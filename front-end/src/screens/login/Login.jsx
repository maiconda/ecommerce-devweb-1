import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/login", {
                username,
                password,
            }).then((response) => {
                console.log(response.data);
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("user", response.data.user);
                localStorage.setItem("role", response.data.user.roles[0].name);

                if (response.data.user.roles[0].name === "ADMIN") {
                    navigate("/admin");
                } else if (response.data.user.roles[0].name === "USER") {
                    navigate("/home");
                }
            });

        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Credenciais inválidas. Tente novamente!"
            );
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center">Login</h1>
                            {errorMessage && (
                                <p className="text-danger text-center">{errorMessage}</p>
                            )}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Usuário</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    placeholder="Digite seu nome de usuário"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleLogin}
                                >
                                    Entrar
                                </button>
                            </div>
                            <div className="text-center mt-3">
                                <Link to="/login/new" className="text-decoration-none">
                                    Criar conta
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
