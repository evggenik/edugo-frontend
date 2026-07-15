import { useState } from "react";
import logo from "../../assets/logo.png";
import "./LoginPage.css";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <img src={logo} alt="EduGo" className="login-logo" />
                <div className="login-card">
                    <div className="login-header">Войти в EduGo</div>
                    <div className="login-body">
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
                            onClick={() => console.log(email, password)}
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