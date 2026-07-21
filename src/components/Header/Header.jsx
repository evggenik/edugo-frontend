import { useNavigate } from "react-router-dom";
import { getDecodedToken } from "../../utils/auth";
import "./Header.css";
import logo from "../../assets/logo.png";

function Header() {
    const navigate = useNavigate();
    const decoded = getDecodedToken();

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <header className="app-header">
            <img src={logo} alt="EduGo" className="app-header-logo" />
            <div className="app-header-user">
                <span>{decoded?.sub}</span>
                <button className="logout-button" onClick={handleLogout}>Выход</button>
            </div>
        </header>
    )
}

export default Header;