import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/admin">Painel do Administrador</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#adminNavbar"
                    aria-controls="adminNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="adminNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/category/new">Cadastrar Categoria</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products/new">Cadastrar Produto</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/new">Cadastrar Administrador</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button
                                className="btn btn-outline-light"
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.href = "/login";
                                }}
                            >
                                Sair
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
