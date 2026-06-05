import './navBar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '@/context/LoginContext.jsx';

const Navbar = () => {

    const { user, current } = useLoginContext();
    const navigate = useNavigate();

    const [showNav, setShowNav] = useState(true);
    const [startLocation, setStartLocation] = useState(0);

    useEffect(() => { current() }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            currentScroll > startLocation ? setShowNav(false) : setShowNav(true);
            setStartLocation(currentScroll);
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
        <div className='navBar' style={navStyle}>

            <section className='navBarLog' onClick={() => navigate('/')}>
                <img src="/logo.webp" alt="logo" />
                <h1>El <span className='colb'>Prode</span></h1>
            </section>

            <section className='navBarSect'>
                <p>Partidos</p>
                <p>Reglas</p>

                {user.logged
                    ? <p>Mis predicciones</p>
                    : <button className='btn btnA' onClick={() => navigate('/user/session')}>
                        Entrar
                    </button>
                }
            </section>

        </div>
    );
};

export default Navbar;