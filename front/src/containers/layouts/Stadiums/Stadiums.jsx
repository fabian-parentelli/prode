import './stadiums.css';
import { useEffect, useState } from 'react';
import { Spinner, Icons } from 'fara-comp-react';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getStadiumsApi } from '@/helpers/stadiums/getStadiums.api.js';

const Stadiums = () => {

    const { showAlert } = useAlertContext();

    const [stadiums, setStadiums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStadiums = async () => {
            const response = await getStadiumsApi();
            if (response.status === 'success') setStadiums(response.result);
            else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchStadiums();
    }, []);

    if (loading) return <div className="stadiums flex-center"><Spinner color='#69C34E' size='50px' /></div>;

    return (
        <div className="stadiums">
            <h2 className="stadiums-title">Estadios</h2>
            <div className="stadiums-grid">
                {stadiums && stadiums?.map((stadium) => (
                    <div className="stadium-card" key={stadium.id || stadium._id}>
                        <div className="stadium-card-header">
                            <div className="stadium-icon">
                                <Icons type='house' color='#F5F7F5' />
                            </div>
                            <span className="stadium-capacity">{stadium.capacity?.toLocaleString()}</span>
                        </div>
                        <div className="stadium-card-body">
                            <h3 className="stadium-name">{stadium.name}</h3>
                            <p className="stadium-fifa-name">{stadium.fifa_name}</p>
                            <div className="stadium-location">
                                <Icons type='map' size='15px' color='#265120' />
                                <span>{stadium.city}, {stadium.country}</span>
                            </div>
                            <div className="stadium-region">
                                <span className="region-badge">{stadium.region}</span>
                                {stadium.time_zone && <span className="timezone-badge">{stadium.time_zone}</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stadiums;
