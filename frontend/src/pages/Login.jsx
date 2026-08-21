import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("resqgrid_token", response.data.token);
            localStorage.setItem(
                "resqgrid_user",
                JSON.stringify(response.data.user)
            );

            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>ResQGrid</h1>
                <p>Authority Login</p>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;