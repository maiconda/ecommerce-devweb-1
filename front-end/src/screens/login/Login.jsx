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
                console.log(response.data)
                console.log('deu')
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("user", response.data.user)
                localStorage.setItem("role", response.data.user.roles[0].name)

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
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Login</h1>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ display: "block", margin: "10px auto", padding: "10px", width: "300px" }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", margin: "10px auto", padding: "10px", width: "300px" }}
            />
            <button
                onClick={handleLogin}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                }}
            >
                Login
            </button>
            <Link to={'/login/new'}>Criar conta</Link>
        </div>
    );
};

export default Login