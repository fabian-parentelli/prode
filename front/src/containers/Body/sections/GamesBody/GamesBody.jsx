import './gamesBody.css';
import { useEffect, useState, useMemo } from 'react';
import { getGamesApi } from '@/helpers/games/games.api.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import MatchCard from '@/components/tools/MatchCard/MatchCard.jsx';

const GamesBody = () => {

    const { showAlert } = useAlertContext();

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await getGamesApi();
            if (response.status === 'success') setGames(response.result);
            else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchGames();
    }, []);

    const targetDate = useMemo(() => {
        const today = new Date();
        const first = new Date('2026-06-11T00:00:00');
        const last = new Date('2026-07-19T00:00:00');
        if (today < first) return '06/11/2026';
        else if (today > last) return '07/19/2026';
        else {
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const yyyy = today.getFullYear();
            return `${mm}/${dd}/${yyyy}`;
        };
    }, []);

    const filteredGames = useMemo(() => {
        return games
            .filter(g => g.date_local.startsWith(targetDate))
            .sort((a, b) => new Date(a.date_utc) - new Date(b.date_utc));
    }, [games, targetDate]);

    if (loading) return <div className="games-body">Cargando partidos...</div>;

    return (
        <div className="games-body">

            <h3 className="games-body-title">Partidos del día</h3>

            <div className="games-body-list">
                {filteredGames.length === 0
                    ? <p className="games-body-empty">No hay partidos para esta fecha.</p>
                    : filteredGames.map(game => (<MatchCard key={game._id} game={game} />))
                }
            </div>

        </div>
    );
};

export default GamesBody;