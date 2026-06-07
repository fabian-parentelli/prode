import './navBar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '@/context/LoginContext.jsx';

const Navbar = () => {

    const { user, current } = useLoginContext();
    const navigate = useNavigate();

    const [isTop, setIsTop] = useState(true);
    const [showNav, setShowNav] = useState(true);
    const [startLocation, setStartLocation] = useState(0);

    useEffect(() => { current() }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            currentScroll > startLocation ? setShowNav(false) : setShowNav(true);
            setStartLocation(currentScroll);
            setIsTop(currentScroll < 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [startLocation]);

    const navStyle = {
        transition: '0.3s',
        top: showNav ? '0' : '-100px',
        boxShadow: showNav && startLocation > 0 ? '1px 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
    };

    return (
        <div className={`navBar ${isTop ? 'navBar--top' : ''}`} style={navStyle}>

            <section className='navBarLog' onClick={() => navigate('/')}>
                <img src="/logo.webp" alt="logo" />
                <h1>El <span className='colb'>Prode</span></h1>
            </section>

            <section className='navBarSect'>
                <p onClick={() => navigate('/games')}>Partidos</p>
                {user.logged
                    ? <>
                        <p>Mi Perfil</p>
                        <p onClick={() => navigate('/prediction')}>Predicciones</p>
                    </>
                    : <>
                        <p>Reglas</p>
                        <button className='btn btnA' onClick={() => navigate('/user/session')}>
                            Entrar
                        </button>
                    </>
                }
            </section>

        </div>
    );
};

export default Navbar;