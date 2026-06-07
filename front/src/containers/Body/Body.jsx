import './body.css';
import { useNavigate } from 'react-router-dom';
import StatsSection from './sections/StatsSection/StatsSection.jsx';
import GamesBody from './sections/GamesBody/GamesBody.jsx';
import GroupsBody from './sections/GroupsBody/GroupsBody.jsx';
import CountdownCard from '@/components/CountdownCard/CountdownCard.jsx';

const Body = () => {

    const navigate = useNavigate();

    return (
        <div className="body">
            <img src="/logo.webp" alt="img" />
            <p className='colb'>Mundial 2026</p>

            <h1>Es hora de demostrar quién sabe más.<br /> Pronostica los <span className='colb'>resultados</span> con amigos.</h1>
            <p className='bodyp'>Arriesgá tus resultados para los 104 partidos, acumulá puntos con cada acierto y seguí la tabla en tiempo real para ver quién se queda con la punta.</p>

            <section className='btns-row bodyBtns'>
                <button className='btn btnA' onClick={()=> navigate('/games')}>Partidos</button>
                <button className='btn btnB'>Posiciones</button>
            </section>

            <br />
            <br />

            <StatsSection />
            <CountdownCard />
            <GamesBody />
            <GroupsBody />
        </div>
    );
};

export default Body;