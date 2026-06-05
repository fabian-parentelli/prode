import { useState } from 'react';
import { SpinnerH } from 'fara-comp-react';
import { useLoginContext } from '@/context/LoginContext.jsx';
import PassInput from '@/components/tools/PassInput/PassInput.jsx';

const Login = ({ toggle }) => {

    const { postUserContext } = useLoginContext();

    const [laoding, setLoading] = useState(false);
    const [values, setValues] = useState({ email: '', password: '' });

    const handleChange = (e) => setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await postUserContext({ ...values, type: 'login' });
        setLoading(false);
    };

    return (
        <form className="session-form" onSubmit={handleSubmit}>

            <div className='flex-center'>
                <img src="/logo.webp" width='60px' alt="logo" />
            </div>

            <h2>Iniciar Sesión</h2>

            <div className="input-group">
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={values.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <PassInput
                    password={values.password}
                    handleChange={handleChange}
                    required={true}
                />
            </div>

            <button type="submit" className="btnA session-btn" disabled={laoding}>
                {laoding
                    ? <SpinnerH color='#0B0F0C' />
                    : 'Ingresar'
                }
            </button>

            <p className="session-toggle">
                ¿No tienes cuenta?{' '}
                <button type="button" className="link-btn" onClick={toggle}>
                    Regístrate
                </button>
            </p>
        </form>
    );
};

export default Login;