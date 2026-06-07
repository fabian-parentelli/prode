import './matchCard.css';

const MatchCard = ({ game }) => {

    return (
        <div className="match-card">

            <div className="match-header">
                <span className="match-group">Grupo {game.group}</span>
                <span className="match-date">
                    {new Date(game.date_utc).toLocaleString(undefined, {
                        weekday: 'long', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
                    })} hrs.
                </span>
            </div>
            
            <div className="match-body">
                <div className="match-team home">
                    {game.home_team?.flag && (
                        <img className="match-flag" src={game.home_team.flag} alt={game.home_team.name} />
                    )}
                    <span className="match-team-name">{game.home_team?.name || game.home_team_id}</span>
                </div>

                <div className="match-score">
                    <span className="score-number">{game.home_score}</span>
                    <span className="score-separator">-</span>
                    <span className="score-number">{game.away_score}</span>
                </div>
                
                <div className="match-team away">
                    {game.away_team?.flag && (
                        <img className="match-flag" src={game.away_team.flag} alt={game.away_team.name} />
                    )}
                    <span className="match-team-name">{game.away_team?.name || game.away_team_id}</span>
                </div>
            </div>

            <div className="match-footer">
                <span className={`match-status ${game.status}`}>
                    {game.status === 'notstarted' ? 'No iniciado' : game.status}
                </span>
            </div>
        </div>
    );
};

export default MatchCard;