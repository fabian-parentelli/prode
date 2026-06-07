import './groupCard.css';
import { Tooltip } from 'fara-comp-react';

const GroupCard = ({ group }) => {
    return (
        <div className="group-card">
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
                                <div className="team-cell-inner">
                                    {team.flag &&
                                        <img className="team-flag-small" src={team.flag} alt={team.name} />
                                    }
                                    <span>{team.name || team.team_id}</span>
                                </div>
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
    );
};

export default GroupCard;
