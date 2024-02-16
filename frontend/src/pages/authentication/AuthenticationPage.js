import styles from './authPage.module.css';
import LoginForm from "../../components/LoginForm/LoginForm";

const AuthenticationPage = () => {
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
}

export default AuthenticationPage