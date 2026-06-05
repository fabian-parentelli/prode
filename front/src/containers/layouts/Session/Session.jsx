import './session.css';
import Login from './Login.jsx';
import Register from './Register.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '@/context/LoginContext.jsx';

const Session = () => {

    const navigate = useNavigate();
    const { user } = useLoginContext();

    const [isLogin, setIsLogin] = useState(true);

    const toggle = () => setIsLogin(prev => !prev);

    useEffect(() => {
        if (!user.logged) return;
        navigate('/');
    }, [user.logged]);

    return (
        <div className="session">
            {isLogin
                ? <Login toggle={toggle} />
                : <Register toggle={toggle} />
            }
        </div>
    );
};

export default Session;