import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDecodedToken } from "../../utils/auth";
import logo from "../../assets/logo.png";
import "./Header.css";

function Header() {
    const navigate = useNavigate();
    const decoded = getDecodedToken();
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="app-header">
            <Link to="/teachers">
                <img src={logo} alt="EduGo" className="app-header-logo" />
            </Link>

            <div className="app-header-user" ref={dropdownRef} onClick={toggleMenu}>
                <svg className="user-icon" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
                <span>{decoded?.sub}</span>
                <span className="dropdown-arrow">▾</span>

                {menuOpen && (
                    <div className="user-dropdown">
                        <a onClick={() => navigate('/profile')}>Профиль</a>
                        <a onClick={handleLogout}>Выход</a>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;