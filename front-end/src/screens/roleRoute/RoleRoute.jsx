import {Navigate} from "react-router-dom";

const RoleRoute = ({ allowedRole, children }) => {

    const isLogged = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('role');

    if(!isLogged || allowedRole !== userRole) {
        return <Navigate to='/login' replace />
    }

    return children
}

export default RoleRoute