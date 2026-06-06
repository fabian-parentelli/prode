const groupsDto = (groups, teams) => {
    const teamsMap = new Map(teams.map(team => [team.id, team]));

    return groups.map(group => ({
        ...group,
        teams: group.teams.map(teamStat => {
            const teamData = teamsMap.get(teamStat.team_id);
            return {
                ...teamStat,
                name: teamData?.name || null,
                flag: teamData?.flag || null,
            };
        }),
    }));
};

export { groupsDto };