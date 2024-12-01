import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); 
        navigate("/login"); 
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
            <div className="container">
                <Link className="navbar-brand text-white" to="/home">
                    <strong>Ecommerce</strong>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#userNavbar"
                    aria-controls="userNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="userNavbar">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item d-flex">
                            <Link className="nav-link text-white" to="/cart">
                                Carrinho de Compras
                            </Link>
                            <Link className="nav-link text-white" to="/orders">
                                Compras
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger ms-2" onClick={handleLogout}>
                                Sair
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;
