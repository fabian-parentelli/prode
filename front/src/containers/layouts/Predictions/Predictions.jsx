import './predictions.css';
import { Spinner } from 'fara-comp-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGamesApi } from '@/helpers/games/games.api.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useLoginContext } from '@/context/LoginContext.jsx';
import { getUserPredictionsApi, savePredictionsApi } from '@/helpers/predictions/predictions.api.js';

const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const Predictions = () => {
    const navigate = useNavigate();
    const { showAlert } = useAlertContext();
    const { user } = useLoginContext();

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [predictions, setPredictions] = useState({});
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await getGamesApi();
            if (response.status === 'success') {
                const groupGames = response.result.filter(g => g.type === 'group');
                setGames(groupGames);
                const initialPredictions = {};
                groupGames.forEach(g => {
                    const started = new Date() >= new Date(g.date_utc);
                    initialPredictions[g._id] = {
                        home: started ? (g.home_score ?? '') : '',
                        away: started ? (g.away_score ?? '') : '',
                    };
                });

                if (user?.logged && user?.data) {
                    const userId = user.data._id || user.data.id;
                    const predResponse = await getUserPredictionsApi(userId);
                    if (predResponse?.status === 'success' && predResponse?.result?.predictions) {
                        predResponse.result.predictions.forEach(p => {
                            initialPredictions[p.game] = {
                                home: p.home,
                                away: p.away,
                            };
                        });
                    }
                }

                setPredictions(initialPredictions);
            } else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchGames();
    }, [user]);

    const handleChange = (gameId, field, value) => {
        setPredictions(prev => ({
            ...prev, [gameId]: {
                ...prev[gameId],
                [field]: value === '' ? '' : Math.max(0, parseInt(value, 10)),
            },
        }));
    };

    const isFilled = (gameId) => {
        const p = predictions[gameId];
        return p && p.home !== '' && p.away !== '';
    };

    const isStarted = (game) => new Date() >= new Date(game.date_utc);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.logged) return showAlert('Debes iniciar sesión para guardar predicciones', 'error');

        const payload = games
            .filter(g => !isStarted(g) && predictions[g._id]?.home !== '' && predictions[g._id]?.away !== '')
            .map(g => ({
                game: g._id,
                home: predictions[g._id].home,
                away: predictions[g._id].away,
            }));

        const userId = user.data._id || user.data.id;
        const response = await savePredictionsApi(userId, payload);
        if (response?.status === 'success') {
            showAlert('Predicciones guardadas correctamente');
            navigate('/');
        } else {
            showAlert(response?.error || 'Error al guardar predicciones', 'error');
        }
    };

    const groupedGames = groupLetters
        .map(letter => ({
            letter,
            games: games.filter(g => g.group === letter).sort((a, b) => new Date(a.date_utc) - new Date(b.date_utc)),
        }))
        .filter(g => g.games.length > 0);

    const isLastGroup = currentGroupIndex === groupedGames.length - 1;
    const isFirstGroup = currentGroupIndex === 0;

    const saveCurrentGroup = async () => {
        const currentGroupGames = groupedGames[currentGroupIndex]?.games || [];
        const payload = currentGroupGames
            .filter(g => !isStarted(g) && predictions[g._id]?.home !== '' && predictions[g._id]?.away !== '')
            .map(g => ({
                game: g._id,
                home: predictions[g._id].home,
                away: predictions[g._id].away,
            }));
        if (payload.length === 0) return;
        const userId = user.data._id || user.data.id;
        const response = await savePredictionsApi(userId, payload);
        if (response?.status === 'success') {
            showAlert('Predicciones guardadas correctamente');
        } else {
            showAlert(response?.error || 'Error al guardar predicciones', 'error');
        }
    };

    const handleNext = async () => {
        if (!user?.logged) return showAlert('Debes iniciar sesión para guardar predicciones', 'error');
        if (!isLastGroup) {
            await saveCurrentGroup();
            setCurrentGroupIndex(prev => prev + 1);
        };
    };

    const handlePrev = () => {
        if (!user?.logged) return showAlert('Debes iniciar sesión para guardar predicciones', 'error');
        if (!isFirstGroup) setCurrentGroupIndex(prev => prev - 1);
    };

    if (loading) return <div className="predictions flex-center"><Spinner color='#69C34E' size='50px' /></div>;

    const currentGroup = groupedGames[currentGroupIndex];

    return (
        <div className="predictions">
            <h2 className="predictions-title">Predicciones</h2>

            <div className="predictions-group-selector">
                {groupedGames.map((g, idx) => {
                    const hasPending = g.games.some(game => !isStarted(game) && !isFilled(game._id));
                    return (
                        <button
                            key={g.letter}
                            type="button"
                            className={`predictions-group-pill ${idx === currentGroupIndex ? 'active' : ''} ${hasPending ? 'pending' : 'completed'}`}
                            onClick={() => setCurrentGroupIndex(idx)}
                        >
                            {g.letter}
                            {hasPending && <span className="predictions-pill-dot" />}
                        </button>
                    );
                })}
            </div>

            <form onSubmit={handleSubmit} className="predictions-form">
                {currentGroup && (
                    <section className="predictions-section">
                        <h3 className="predictions-group-title">Grupo {currentGroup.letter}</h3>
                        <div className="predictions-group-list">
                            {currentGroup.games.map(game => {
                                const started = isStarted(game);
                                const filled = isFilled(game._id);
                                return (
                                    <div key={game._id} className={`predictions-card ${started ? 'started' : ''} ${filled ? 'filled' : ''}`}>
                                        <div className="predictions-card-header">
                                            <span className="predictions-card-group">Grupo {game.group}</span>
                                            <span className="predictions-card-date">
                                                {new Date(game.date_utc).toLocaleString(undefined, {
                                                    weekday: 'long', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
                                                })} hrs.
                                            </span>
                                        </div>
                                        <div className="predictions-card-body">
                                            <div className="predictions-team home">
                                                {game.home_team?.flag && (
                                                    <img className="predictions-flag" src={game.home_team.flag} alt={game.home_team.name} />
                                                )}
                                                <span className="predictions-team-name">{game.home_team?.name || game.home_team_id}</span>
                                            </div>
                                            <div className="predictions-inputs">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="predictions-input"
                                                    value={predictions[game._id]?.home ?? ''}
                                                    onChange={e => handleChange(game._id, 'home', e.target.value)}
                                                    disabled={started}
                                                />
                                                <span className="predictions-separator">-</span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="predictions-input"
                                                    value={predictions[game._id]?.away ?? ''}
                                                    onChange={e => handleChange(game._id, 'away', e.target.value)}
                                                    disabled={started}
                                                />
                                            </div>
                                            <div className="predictions-team away">
                                                {game.away_team?.flag && (
                                                    <img className="predictions-flag" src={game.away_team.flag} alt={game.away_team.name} />
                                                )}
                                                <span className="predictions-team-name">{game.away_team?.name || game.away_team_id}</span>
                                            </div>
                                        </div>
                                        {started && (
                                            <div className="predictions-card-footer">
                                                <span className="predictions-finished-badge">Bloqueado</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                <div className="predictions-nav">
                    <button
                        type="button"
                        className="predictions-nav-btn"
                        onClick={handlePrev}
                        disabled={isFirstGroup}
                    >
                        Anterior
                    </button>

                    {isLastGroup ? (
                        <button type="submit" className="btnA predictions-nav-btn predictions-submit-btn">
                            Guardar
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btnA predictions-nav-btn"
                            onClick={handleNext}
                        >
                            Siguiente
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Predictions;