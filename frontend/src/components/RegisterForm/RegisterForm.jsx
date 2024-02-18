import { useState } from "react"
import styles from './registerForm.module.css';
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registrationStatus, setRegistrationStatus] = useState(false);
    const navigate = useNavigate()
    const AUTH_PORT = 8003;
    const AUTH_ENDPOINT = `http://localhost:${AUTH_PORT}/register`;

    async function handleSubmit(e) {
        e.preventDefault();

        const userInfo = {
            userName: username,
            email: email,
            password: password
        };

        const request = await fetch(AUTH_ENDPOINT, {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {"Content-Type" : "application/json"},
            credentials: 'include'
        });

        const response = await request.json();

        if (response.status == "success") {
            setRegistrationStatus(true);
            navigate("/");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.formEntries}>
                    <div className={styles.entry}>
                        <span>Username</span>
                        <input 
                            type="text" 
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

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

                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}