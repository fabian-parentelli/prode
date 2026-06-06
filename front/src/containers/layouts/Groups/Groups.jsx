import './groups.css';
import { useEffect, useState } from 'react';
import { Tooltip, Spinner } from 'fara-comp-react';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getGroupsApi } from '@/helpers/groups/groups.api.js';

const Groups = () => {

    const { showAlert } = useAlertContext();

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState('');

    const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await getGroupsApi();
            if (response.status === 'success') setGroups(response.result);
            else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchGroups();
    }, []);

    const filteredGroups = (selectedGroup
        ? groups.filter(g => g.name === selectedGroup)
        : groups
    ).sort((a, b) => a.name.localeCompare(b.name));

    if (loading) return <div className="groups flex-center"><Spinner color='#69C34E' size='50px' /></div>;
    return (
        <div className="groups">
            <h2 className="groups-title">Grupos</h2>
            <div className="groups-filter">
                <button
                    className={`filter-btn ${selectedGroup === '' ? 'active' : ''}`}
                    onClick={() => setSelectedGroup('')}
                >
                    Todos
                </button>
                {groupLetters.map(letter => (
                    <button
                        key={letter}
                        className={`filter-btn ${selectedGroup === letter ? 'active' : ''}`}
                        onClick={() => setSelectedGroup(letter)}
                    >
                        {letter}
                    </button>
                ))}
            </div>
            <div className="groups-list">
                {filteredGroups.map(group => (
                    <div className="group-card" key={group._id}>
                        <h3 className="group-name">Grupo {group.name}</h3>
                        <table className="group-table">
                            <thead>
                                <tr>
                                    <th className="col-team">Equipo</th>

                                    <th className="col-stat">
                                        <Tooltip text='Partidos Jugados' backgroundColor='#265120'>
                                            PJ
                                        </Tooltip>
                                    </th>

                                    <th className="col-stat">
                                        <Tooltip text='Partidos Ganados' backgroundColor='#265120'>
                                            PG
                                        </Tooltip>
                                    </th>
                                    <th className="col-stat">
                                        <Tooltip text='Partidos Empatados' backgroundColor='#265120'>
                                            PE
                                        </Tooltip>
                                    </th>
                                    <th className="col-stat">
                                        <Tooltip text='Partidos Perdidos' backgroundColor='#265120'>
                                            PP
                                        </Tooltip>
                                    </th>
                                    <th className="col-stat">
                                        <Tooltip text='Goles a Favor' backgroundColor='#265120'>
                                            GF
                                        </Tooltip>
                                    </th>
                                    <th className="col-stat">
                                        <Tooltip text='Goles en Contra' backgroundColor='#265120'>
                                            GC
                                        </Tooltip>
                                    </th>
                                    <th className="col-stat">
                                        <Tooltip text='Diferencia de Goles' backgroundColor='#265120'>
                                            DG
                                        </Tooltip>
                                    </th>
                                    <th className="col-stat">
                                        <Tooltip text='Puntos' backgroundColor='#265120'>
                                            Pts
                                        </Tooltip>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {group.teams.map(team => (
                                    <tr key={team.team_id}>
                                        <td className="team-cell">
                                            {team.flag && (
                                                <img className="team-flag-small" src={team.flag} alt={team.name} />
                                            )}
                                            <span>{team.name || team.team_id}</span>
                                        </td>
                                        <td>{team.mp}</td>
                                        <td>{team.w}</td>
                                        <td>{team.d}</td>
                                        <td>{team.l}</td>
                                        <td>{team.gf}</td>
                                        <td>{team.ga}</td>
                                        <td>{team.gd}</td>
                                        <td>{team.pts}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Groups;