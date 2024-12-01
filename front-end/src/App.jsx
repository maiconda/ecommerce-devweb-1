import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css';
import Login from "./screens/login/Login.jsx";
import RoleRoute from "./screens/roleRoute/RoleRoute.jsx";
import Home from "./screens/home/Home.jsx";
import Admin from "./screens/admin/Admin.jsx";
import Product from "./screens/product/Product.jsx";
import NewProduct from "./screens/newProduct/NewProduct.jsx";
import NewAdmin from "./screens/newAdmin/NewAdmin.jsx";
import NewCategory from "./screens/newCategory/newCategory.jsx";
import NewUser from "./screens/newUser/newUser.jsx";
import AdminNavbar from "./components/adminNavbar/AdminNavbar.jsx";
import UserNavbar from "./components/userNavbar/UserNavbar.jsx";
import Cart from "./screens/cart/Cart.jsx";
import Orders from "./screens/orders/Orders.jsx";

const App = () => {
    const [role, setRole] = useState(localStorage.getItem("role"));

    useEffect(() => {
        const handleStorageChange = () => {
            setRole(localStorage.getItem("role"));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const Layout = ({ children }) => {
        const location = useLocation();

        const hideNavbar = location.pathname === "/login" || location.pathname === "/login/new";

        return (
            <>
                {!hideNavbar && role === "ADMIN" && <AdminNavbar />}
                {!hideNavbar && role === "USER" && <UserNavbar />}
                {children}
            </>
        );
    };

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={
                        <RoleRoute allowedRole={'USER'}>
                            <Home />
                        </RoleRoute>
                    } />
                    <Route path="/product/:id" element={
                        <RoleRoute allowedRole={'USER'}>
                            <Product />
                        </RoleRoute>
                    } />
                                        <Route path="/cart" element={
                        <RoleRoute allowedRole={'USER'}>
                            <Cart />
                        </RoleRoute>
                    } />
                                                            <Route path="/orders" element={
                        <RoleRoute allowedRole={'USER'}>
                            <Orders />
                        </RoleRoute>
                    } />
                    <Route path="/admin" element={
                        <RoleRoute allowedRole={'ADMIN'}>
                            <Admin />
                        </RoleRoute>
                    } />
                    <Route
                        path="/products/new"
                        element={
                            <RoleRoute allowedRole={"ADMIN"}>
                                <NewProduct />
                            </RoleRoute>
                        }
                    />
                    <Route
                        path="/admin/new"
                        element={
                            <RoleRoute allowedRole={"ADMIN"}>
                                <NewAdmin />
                            </RoleRoute>
                        }
                    />
                    <Route
                        path="/category/new"
                        element={
                            <RoleRoute allowedRole="ADMIN">
                                <NewCategory />
                            </RoleRoute>
                        }
                    />
                    <Route path="/login/new" element={<NewUser />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
