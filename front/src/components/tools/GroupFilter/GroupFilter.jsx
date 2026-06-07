import './groupFilter.css';

const GROUP_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const GroupFilter = ({ selectedGroup, onSelect, showAll = true }) => {
    return (
        <div className="groups-filter">
            {showAll && (
                <button
                    className={`filter-btn ${selectedGroup === '' ? 'active' : ''}`}
                    onClick={() => onSelect('')}
                >
                    Todos
                </button>
            )}
            {GROUP_LETTERS.map(letter => (
                <button
                    key={letter}
                    className={`filter-btn ${selectedGroup === letter ? 'active' : ''}`}
                    onClick={() => onSelect(letter)}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default GroupFilter;
