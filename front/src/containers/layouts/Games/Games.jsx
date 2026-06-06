import './games.css';
import { Spinner } from 'fara-comp-react';
import { useEffect, useState } from 'react';
import { getGamesApi } from '@/helpers/games/games.api.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import MatchCard from '@/components/tools/MatchCard/MatchCard.jsx';

const Games = () => {
    const { showAlert } = useAlertContext();

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('group');
    const [selectedGroup, setSelectedGroup] = useState('');

    const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    const types = ['group', 'round_of_16', 'quarter', 'semi', 'third_place', 'final'];

    useEffect(() => {
        const fetchGames = async () => {
            const response = await getGamesApi();
            if (response.status === 'success') setGames(response.result);
            else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchGames();
    }, []);

    const filteredGames = games
        .filter(g => g.type === selectedType)
        .filter(g => selectedType === 'group' && selectedGroup ? g.group === selectedGroup : true)
        .sort((a, b) => new Date(a.date_utc) - new Date(b.date_utc));

    if (loading) return <div className="games flex-center"> <Spinner color='#69C34E' size='50px' /> </div>;
    return (
        <div className="games">
            <h2 className="games-title">Partidos</h2>

            <div className="games-filter type-filter">
                {types.map(type => (
                    <button
                        key={type}
                        className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                        onClick={() => { setSelectedType(type); setSelectedGroup(''); }}
                    >
                        {type === 'group' ? 'Grupos' :
                            type === 'round_of_16' ? 'Octavos' :
                                type === 'quarter' ? 'Cuartos' :
                                    type === 'semi' ? 'Semis' :
                                        type === 'third_place' ? '3er Puesto' :
                                            type === 'final' ? 'Final' : type}
                    </button>
                ))}
            </div>

            {selectedType === 'group' && (
                <div className="games-filter group-filter">
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
            )}

            <div className="games-list">
                {filteredGames.length === 0 ? (
                    <p className="games-empty">No hay partidos para mostrar.</p>
                ) : (
                    filteredGames.map(game => (
                        <MatchCard key={game._id} game={game} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Games;