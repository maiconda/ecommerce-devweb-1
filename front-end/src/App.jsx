import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Login from "./screens/login/Login.jsx";
import RoleRoute from "./screens/roleRoute/RoleRoute.jsx";
import Home from "./screens/home/Home.jsx";
import Admin from "./screens/admin/Admin.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/home" element={
                    <RoleRoute allowedRole={'user'}>
                        <Home/>
                    </RoleRoute>
                } />

                <Route path="/admin" element={
                    <RoleRoute allowedRole={'admin'}>
                        <Admin/>
                    </RoleRoute>
                } />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App
