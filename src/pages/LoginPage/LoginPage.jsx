import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./LoginPage.css";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    async function handleLogin() {
        const response = await fetch("http://localhost:8080/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            navigate('/schedule');
        } else {
            setError('Неверный логин или пароль');
        }
    }

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <img src={logo} alt="EduGo" className="login-logo" />
                <div className="login-card">
                    <div className="login-header">Войти в EduGo</div>
                    <div className="login-body">
                        {error && <p className="error-message">{error}</p>}
                        <div className="form-group">
                            <label>Логин</label>
                            <input
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Пароль</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <button
                            className="login-button"
                            onClick={handleLogin}
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;