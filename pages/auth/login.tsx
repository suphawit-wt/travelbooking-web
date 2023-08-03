import styles from '@/styles/Login.module.scss'
import { useContext, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';

const Login = () => {
    const router = useRouter();

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const { loading, error, dispatch }: any = useContext(AuthContext);

    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/api/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
            router.push({
                pathname: '/'
            });
        } catch (err: any) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.lContainer}>
                <input type="text" placeholder='username' id='username' onChange={handleChange} className={styles.lInput} />
                <input type="password" placeholder='password' id='password' onChange={handleChange} className={styles.lInput} />
                <button disabled={loading} onClick={handleLogin} className={styles.lButton}>Login</button>
                {error && <span>{error}</span>}
                <Link href="/">
                    <a className='text-center'>back to index page</a>
                </Link>
            </div>
        </div>
    )
}

export default Login;