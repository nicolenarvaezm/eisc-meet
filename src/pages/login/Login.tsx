import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from '../../stores/useAuthStore';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { loginWithGoogle, initAuthObserver } = useAuthStore();

    const handleLoginGoogle = (e: React.FormEvent) => {
        e.preventDefault();
        loginWithGoogle().then(() => navigate("/home"));
    }

    useEffect(()   => {
        const unsub = initAuthObserver();
        return () => unsub();
    }, [initAuthObserver]);
    
    return (
        <div className="container-page" style={{ backgroundColor: '#f0f2f5', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ height: 'auto', backgroundColor: 'white' }}>
                <h1>Iniciar Sesión</h1>
                <div>
                    <button onClick={handleLoginGoogle} >
                        <img src="icons/google-icon.svg" alt="Iniciar sesión con Google" width={24} height={24} />
                        <span>Google</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login