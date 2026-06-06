import './teams.css';
import { Spinner } from 'fara-comp-react';
import { useEffect, useState } from 'react';
import { getTeamsApi } from '@/helpers/teams/teams.api.js';
import { useAlertContext } from '@/context/AlertContext.jsx';

const Teams = () => {

    const { showAlert } = useAlertContext();

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await getTeamsApi();
            if (response.status === 'success') setTeams(response.result);
            else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchTeams();
    }, []);

    if (loading) return <div className="teams flex-center"><Spinner color='#69C34E' size='50px' /></div>;
    return (
        <div className="teams">
            <h2 className="teams-title">Equipos Participantes</h2>
            <div className="teams-grid">
                {teams && teams?.map((team) => (
                    <div className="team-card" key={team.id || team._id}>
                        <img className="team-flag" src={team.flag} alt={`Bandera de ${team.name}`} />
                        <span className="team-name">{team.name}</span>
                        <span className="team-code">{team.fifa_code}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;