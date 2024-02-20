import { useState } from "react"
import styles from './loginForm.module.css';
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const AUTH_PORT = 8003;
    const AUTH_ENDPOINT = `http://localhost:${AUTH_PORT}/login`;

    async function handleSubmit(e) {
        e.preventDefault();
        let credential = {
            email: email,
            password: password
        };

        const request = await fetch(AUTH_ENDPOINT, {
            method: "POST",
            body: JSON.stringify(credential),
            headers: {"Content-Type" : "application/json"},
            credentials: 'include'
        });

        const response = await request.json();
        setSuccess(response.status);
        setErrorMessage(response.message);
        if (response.status == "success") {
            navigate("/");
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.formEntries}>
                    <div className={styles.entry}>
                        <span>Email</span>
                        <input 
                            type="email" 
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.entry}>
                        <span>Password</span>
                        <input 
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit">Login</button>
                </div>
            </form>
            <div className={styles.errorMessageContainer}>
                {
                    success === "unsuccess" ? 
                    <span className={styles.errorMessage}>{errorMessage}</span> :
                    <span></span>
                }
            </div>
        </div>
    );
}