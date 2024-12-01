import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Login from "./screens/login/Login.jsx";
import RoleRoute from "./screens/roleRoute/RoleRoute.jsx";
import Home from "./screens/home/Home.jsx";
import Admin from "./screens/admin/Admin.jsx";
import Product from "./screens/product/Product.jsx";
import NewProduct from "./screens/newProduct/NewProduct.jsx";
import NewAdmin from "./screens/newAdmin/NewAdmin.jsx";
import NewCategory from "./screens/newCategory/newCategory.jsx";
import NewUser from "./screens/newUser/newUser.jsx";

const App = () => {
    return (
        <Router>
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
                        <RoleRoute allowedRole="ADMIN"> {/* Apenas administradores podem acessar */}
                            <NewCategory />
                        </RoleRoute>
                    }
                />

                <Route path="/login/new" element={<NewUser/>}/>

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App
