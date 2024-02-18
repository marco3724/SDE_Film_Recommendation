import styles from './authPage.module.css';
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { useState } from 'react';

const AuthenticationPage = () => {
    const [isRegisterForm, setRegisterForm] = useState(false);


    return (
        <>
            <div className={styles.container}>
                {!isRegisterForm ?
                    <LoginForm />
                    :
                    <RegisterForm />
                }
            </div>
            <div className={styles.register}>
                {!isRegisterForm ?
                    <p>Not a member? 
                        <a className={styles.registerLink}
                            onClick={() => setRegisterForm(true)}> Register!</a>
                    </p>
                    :
                    <p>Maybe you forgot you have an account,
                        <a className={styles.registerLink}
                            onClick={() => setRegisterForm(false)}> Login!</a>
                    </p>
                }
            </div>
        </>
    );
}

export default AuthenticationPage