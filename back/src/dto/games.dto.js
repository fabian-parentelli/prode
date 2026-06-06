const convertLocalToBuenosAires = (localDateStr, timeZone) => {
    if (!localDateStr || !timeZone) return localDateStr;

    const [datePart, timePart] = localDateStr.split(' ');
    const [month, day, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    const utcTentative = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const parts = formatter.formatToParts(utcTentative);
    const get = (t) => parseInt(parts.find(p => p.type === t)?.value);

    const fYear = get('year');
    const fMonth = get('month');
    const fDay = get('day');
    const fHour = get('hour');
    const fMinute = get('minute');
    const fSecond = get('second') || 0;

    const desiredSecs = Date.UTC(year, month - 1, day, hours, minutes, 0) / 1000;
    const actualSecs = Date.UTC(fYear, fMonth - 1, fDay, fHour, fMinute, fSecond) / 1000;
    const diffSecs = desiredSecs - actualSecs;

    const trueUTC = new Date(utcTentative.getTime() + diffSecs * 1000);

    return new Intl.DateTimeFormat('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(trueUTC);
};

const gamesDto = (games, teams, stadiums) => {
    const teamsMap = new Map(teams.map(team => [team.id, team]));
    const stadiumsMap = new Map(stadiums.map(stadium => [stadium.id, stadium]));

    return games.map(game => {
        const homeTeam = teamsMap.get(game.home_team_id);
        const awayTeam = teamsMap.get(game.away_team_id);
        const stadium = stadiumsMap.get(game.stadium_id);

        return {
            ...game,
            date_local: convertLocalToBuenosAires(game.date_local, stadium?.time_zone),
            home_team: {
                name: homeTeam?.name || null,
                flag: homeTeam?.flag || null,
            },
            away_team: {
                name: awayTeam?.name || null,
                flag: awayTeam?.flag || null,
            },
        };
    });
};

export { gamesDto };