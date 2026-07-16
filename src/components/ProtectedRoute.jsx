import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "../utils/auth";

function ProtectedRoute({ children, allowedRole }) {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (allowedRole && getUserRole() !== allowedRole) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;