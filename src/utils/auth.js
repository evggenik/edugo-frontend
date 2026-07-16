import { jwtDecode } from "jwt-decode";


export function getToken() {
    return localStorage.getItem('token');
}

export function getDecodedToken() {
    const token = getToken();
    if (!token) {
        return null;
    }
    return jwtDecode(token);
}

export function getUserRole() {
    const decoded = getDecodedToken();
    if (!decoded) {
        return null;
    }
    return decoded.roles[0];
}