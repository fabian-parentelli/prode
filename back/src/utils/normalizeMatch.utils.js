const stadiumTimezones = {
  '1':  'America/Mexico_City',
  '2':  'America/Mexico_City',
  '3':  'America/Monterrey',
  '4':  'America/Chicago',
  '5':  'America/Chicago',
  '6':  'America/Chicago',
  '7':  'America/New_York',
  '8':  'America/New_York',
  '9':  'America/New_York',
  '10': 'America/New_York',
  '11': 'America/New_York',
  '12': 'America/Toronto',
  '13': 'America/Vancouver',
  '14': 'America/Los_Angeles',
  '15': 'America/Los_Angeles',
  '16': 'America/Los_Angeles',
};

function localToUTC(localDateStr, stadiumId) {
  if (!localDateStr || localDateStr === 'null' || localDateStr === '') return null;

  const [datePart, timePart] = localDateStr.split(' ');
  if (!datePart || !timePart) return null;

  // La API usa MM/DD/YYYY
  const [month, day, year] = datePart.split('/');
  const [hours, minutes] = timePart.split(':');

  const timezone = stadiumTimezones[stadiumId];
  if (!timezone) return null;

  const localDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
  if (isNaN(localDate)) return null;

  const utcDate = new Date(
    new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`).toLocaleString('en-US', { timeZone: timezone })
  );

  const diff = localDate - utcDate;
  return new Date(localDate.getTime() + diff);
}

function normalizeMatch(raw) {
  const isTeamDefined = (id) => id !== '0' && id !== null;

  return {
    id:                    raw.id,
    home_team_id:          isTeamDefined(raw.home_team_id) ? raw.home_team_id : null,
    away_team_id:          isTeamDefined(raw.away_team_id) ? raw.away_team_id : null,
    home_team_placeholder: !isTeamDefined(raw.home_team_id) ? raw.home_team_name_en : null,
    away_team_placeholder: !isTeamDefined(raw.away_team_id) ? raw.away_team_name_en : null,
    home_score:            parseInt(raw.home_score) || 0,
    away_score:            parseInt(raw.away_score) || 0,
    home_scorers:          raw.home_scorers === 'null' ? [] : raw.home_scorers,
    away_scorers:          raw.away_scorers === 'null' ? [] : raw.away_scorers,
    group:                 raw.group,
    matchday:              parseInt(raw.matchday),
    stadium_id:            raw.stadium_id,
    date_local:            raw.local_date,
    date_utc:              localToUTC(raw.local_date, raw.stadium_id),
    finished:              raw.finished === 'TRUE',
    status:                raw.time_elapsed,
    type:                  raw.type,
  };
}

export { normalizeMatch };