import './statsSection.css';
import { useNavigate } from 'react-router-dom';

const StatsSection = () => {

    const navigate = useNavigate();

    return (
        <section className="stats-section">

            <div className="stat-item" onClick={() => navigate('/teams')}>
                <span className="stat-number">48</span>
                <span className="stat-label">Equipos</span>
            </div>

            <div className="stat-item" onClick={() => navigate('/groups')}>
                <span className="stat-number">12</span>
                <span className="stat-label">Grupos</span>
            </div>
            <div className="stat-item" onClick={() => navigate('/games')}>
                <span className="stat-number">104</span>
                <span className="stat-label">Partidos</span>
            </div>
            <div className="stat-item" onClick={() => navigate('/stadiums')}>
                <span className="stat-number">16</span>
                <span className="stat-label">Estadios</span>
            </div>
            
        </section>
    );
};

export default StatsSection;