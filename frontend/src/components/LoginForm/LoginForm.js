import { useState } from "react"
import styles from './loginForm.module.css';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleInputChange(e) {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div className={styles.formEntries}>
                    <div className={styles.entry}>
                        <span>Email</span>
                        <input 
                            type="email" 
                            name="email" 
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={styles.entry}>
                        <span>Password</span>
                        <input type="password" name="password" />
                        
                    </div>

                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}